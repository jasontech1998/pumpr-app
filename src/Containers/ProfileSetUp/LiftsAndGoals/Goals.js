import React, {Component} from 'react';
import './GoalsList.css';
import Button from '../../../Components/UI/Button/Button';
import ExperienceList from './ExperienceList';
import GoalsList from './GoalsList';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionSetup';
import * as actionUpdates from '../../../store/actions/actionPumpr';

class Goals extends Component {
  state  = {
    isSubmit: false,
    selectedGoals: [],
    selectedExp: ''
  };

  componentDidMount = () => {
    if (this.props.goals && this.state.selectedGoals.length === 0) {
      if (this.props.goals.goals[0] === "") {
        console.log(this.props.goals.goals);
        this.setState({selectedExp: this.props.goals.experience});
      }
      else {
        this.setState({
          selectedGoals: this.props.goals.goals,
          selectedExp: this.props.goals.experience})
      };
    };
  }

  onNextHandler = () => {
    // if everything is filled out, continue
    if (this.state.selectedExp !== '' && this.state.selectedGoals !== []) {
      this.setState({isSubmit: true});
      const expGoals = {
        experience: this.state.selectedExp,
        goals:this.state.selectedGoals
      };
      this.props.submitGoalsHandler(expGoals);
    }
    else {
      alert('Please fill out the form');
    }
  }

  selectedExpHandler = (level) => {
    // if state is equal, remove and update state
    if (this.state.selectedExp === level) {
      this.setState({selectedExp: ''}, () => console.log(this.state.selectedExp));
    }
    // if state is not equal, update state to new level
    else {
      this.setState({selectedExp: level}, () => console.log(this.state.selectedExp));
    }
  }

  selectedGoalsHandler = (goal) => {
    // if already includes, remove and update state
    if (this.state.selectedGoals.includes(goal)) {
      const indexOf = this.state.selectedGoals.indexOf(goal);
      const copySelectedGoals = this.state.selectedGoals.slice();
      copySelectedGoals.splice(indexOf, 1);
      this.setState(() => {
        return {
          selectedGoals: copySelectedGoals}},
          () => console.log(this.state.selectedGoals));
    }
    // if not includes, concat into array and update state
    else {
      this.setState((prevState) => {
        return {
          selectedGoals: prevState.selectedGoals.concat(goal)}},
        () => console.log(this.state.selectedGoals));
    }
  }

  onSaveHandler = () => {
    const userKey = this.props.ownData.id;
    const token = localStorage.getItem('token');
    let goals = null;
    if (this.state.selectedGoals.length === 0) {
      goals = {
        experience: this.state.selectedExp,
        goals: [""]
      };
    }
    else {
      goals = {
        experience: this.state.selectedExp,
        goals: this.state.selectedGoals
      };
    }
    //  initialize data to be sent to database
    const userSetup = {
      fullName: this.props.ownData.userSetup.fullName,
      profile: this.props.ownData.userSetup.profile,
      lifts: this.props.ownData.userSetup.lifts,
      goals: goals
    };
    const userProfile = {
      userSetup: userSetup,
      userId: localStorage.getItem('userId'),
      id: userKey
    };
    console.log(userProfile);
    // send data to database to be patched with updated userProfile data
    this.props.onUpdateProfileHandler(userKey, token, userProfile);
  }

  render () {
    if (this.state.isSubmit) {
      console.log('is submit');
      return (<Redirect to="/profile-bio-setup"/>)
    };
    let showButton = null;
    // if rendered on /goals
    if (this.props.history.location.pathname === '/goals') {
      showButton = <Button click={this.onNextHandler}>Continue</Button>;
    }
    // if rendered on /profile-settings
    else if (this.props.history.location.pathname === '/profile-settings') {
      showButton = <button
                      onClick={this.onSaveHandler} 
                      className="offerBtn">Save</button>;
    };
    return (
      <div className="col d-flex flex-column justify-content-center">
        <div className="experience mb-3">
          <div className="mb-3">
            <h2 className="text-center">What's your experience level?</h2>
            <small className="text-muted">this data will be used to match you with a partner of a similar experience level</small>
          </div>
            <ExperienceList 
              selectedExp={this.state.selectedExp}
              click={(level) => this.selectedExpHandler(level)}/>
        </div>
        <div className="Goals">
          <div className="mb-3">
            <h2 className="text-center">What are your interests?</h2>
            <small className="text-muted">this data will be used to match you with a partner of common interest</small>
          </div>
          <GoalsList
              selectedGoals={this.state.selectedGoals} 
              click={(goal) => this.selectedGoalsHandler(goal)}/>
          <div className="mt-3">
            {showButton}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitGoalsHandler: (goals) => dispatch(actionCreators.submitGoals(goals)),
    onUpdateProfileHandler: (key, token, userProfile) => dispatch(actionUpdates.updateProfile(key, token, userProfile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals);