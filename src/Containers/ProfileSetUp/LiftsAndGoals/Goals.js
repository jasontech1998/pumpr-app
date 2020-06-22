import React, {Component} from 'react';
import './GoalsList.css';
import Button from '../../../Components/UI/Button/Button';
import ExperienceList from './ExperienceList';
import GoalsList from './GoalsList';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionSetup';

class Goals extends Component {
  state  = {
    isSubmit: false,
    selectedGoals: [],
    selectedExp: ''
  }

  componentDidMount = () => {
    if (this.props.goals && this.state.selectedGoals.length === 0) {
      this.setState({
        selectedGoals: this.props.goals.goals,
        selectedExp: this.props.goals.experience})
    }
  }

  onNextHandler = () => {
    // if everything is filled out, continue
    if (this.state.selectedExp !== '' && this.state.selectedGoals !== []) {
      this.setState({isSubmit: true})
      const expGoals = {
        experience: this.state.selectedExp,
        goals:this.state.selectedGoals
      }
      this.props.submitGoalsHandler(expGoals)
    }
    else {
      alert('Please fill out the form')
    }
  }

  selectedExpHandler = (level) => {
    // if state is equal, remove and update state
    if (this.state.selectedExp === level) {
      this.setState({selectedExp: ''}, () => console.log(this.state.selectedExp))
    }
    // if state is not equal, update state to new level
    else {
      this.setState({selectedExp: level}, () => console.log(this.state.selectedExp))
    }
  }

  selectedGoalsHandler = (goal) => {
    // if already includes, remove and update state
    if (this.state.selectedGoals.includes(goal)) {
      const indexOf = this.state.selectedGoals.indexOf(goal)
      const copySelectedGoals = this.state.selectedGoals.slice()
      copySelectedGoals.splice(indexOf, 1)
      this.setState(() => {
        return {
          selectedGoals: copySelectedGoals}},
          () => console.log(this.state.selectedGoals))
    }
    // if not includes, concat into array and update state
    else {
      this.setState((prevState) => {
        return {
          selectedGoals: prevState.selectedGoals.concat(goal)}},
        () => console.log(this.state.selectedGoals))
    }
  }

  render () {
    if (this.state.isSubmit) {
      console.log('is submit')
      return (<Redirect to="/profile-bio-setup"/>)
    }
    let showButton = null;
    // if rendered on /goals
    if (this.props.history.location.pathname === '/goals') {
      showButton = <Button click={this.onNextHandler}>Continue</Button>
    }
    // if rendered on /profile-settings
    else if (this.props.history.location.pathname === '/profile-settings') {
      showButton = <button
                      onClick={this.onSaveHandler} 
                      className="offerBtn">Save</button>
    }
    return (
      <div className="col d-flex flex-column justify-content-center">
        <div className="experience mb-3">
          <div className="mb-3">
            <h2 className="text-center">what's your experience level?</h2>
            <small className="text-muted">this data will be used to match you with a partner of a similar strength level</small>
          </div>
            <ExperienceList 
              selectedExp={this.state.selectedExp}
              click={(level) => this.selectedExpHandler(level)}/>
        </div>
        <div className="Goals">
          <div className="mb-3">
            <h2 className="text-center">what are your interests?</h2>
            <small className="text-muted">this data will be used to match ou with a partner of a similar strength level</small>
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


const mapDispatchToProps = dispatch => {
  return {
    submitGoalsHandler: (goals) => dispatch(actionCreators.submitGoals(goals))
  }
}

export default connect(null, mapDispatchToProps)(Goals);