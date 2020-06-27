import React, {Component} from 'react';
import classes from './GymSchedule.module.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionSetup';
import * as actionPumpr from '../../../store/actions/actionPumpr';

import Button from '../../../Components/UI/Button/Button';
import Modal from '../../../Components/UI/Modal/Modal';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleModal from './ScheduleModal';

class GymSchedule extends Component {
  state = {
    addedInputs: 0,
    day: '',
    fromInput: '',
    toInput: '',
    fromInput2: '',
    toInput2: '',
    fromInput3: '',
    toInput3: '',
    freeTime: null
  }

  addInputHandler = () => {
    this.setState(prevState => {
      return {addedInputs: prevState.addedInputs + 1}
    })
  }

  removeInputHandler = () => {
    // If secondInput removed, clear inputs
    if (this.state.addedInputs === 1) {
      this.setState(prevState => {
        return {fromInput2: '', toInput2: ''}
      })
    }
    // If thirdInput removed, clear inputs
    else if (this.state.addedInputs === 2) {
      this.setState(prevState => {
        return {fromInput3: '', toInput3: ''}
      })
    }
    this.setState(prevState => {
      return {addedInputs: prevState.addedInputs - 1}
    })
  }
  // Skips Submitting Schedule
  onSkipHandler = () => {
    const userSetup = {
      lifts: this.props.lifts,
      goals: this.props.goals,
      profile: this.props.profile,
      fullName: this.props.fullName
    }

    const userProfile = {
      userSetup: userSetup,
      userId: localStorage.getItem('userId')
    }
    const token = localStorage.getItem('token');
    const key = this.props.userKey;
    // Submit empty schedule, user can edit later
    this.props.submitUserProfile(key, token, userProfile);
    // clear Set Up data
    this.props.clearSetUpHandler();
    // Wait 1 second before pushing to profile page
    setTimeout(() => this.props.history.push('/profile-about'), 1000)
  }
  showModalHandler = (day) => {
    this.setState({day: day})
    this.props.openModalHandler();
    
  }
  hideModalHandler = () => {
    this.setState({freeTime: null, addedInputs: 0})
    this.props.closeModalHandler()
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onClickSubmit = () => {
    switch (this.state.addedInputs) {
      case 2:
        console.log('2 inputs added')
        if ((this.state.fromInput && this.state.toInput && this.state.fromInput2 && this.state.toInput2 && this.state.fromInput3 && this.state.toInput3) === '') {
          alert('Please fill out all available inputs')
          break;
        }
        else {
          var freeTime = {
            freeTime: this.state.fromInput + ' - ' + this.state.toInput,
            freeTime2: this.state.fromInput2 + ' - ' + this.state.toInput2,
            freeTime3: this.state.fromInput3 + ' - ' + this.state.toInput3
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: '',
            fromInput2: '',
            toInput2: '',
            fromInput3: '',
            toInput3: '',})
          this.props.closeModalHandler();
          break;
        }
      case 1:
        console.log('1 input added')
        if ((this.state.fromInput && this.state.toInput && this.state.fromInput2 && this.state.toInput2) === '') {
          alert('Please fill out all available inputs')
          break;
        }
        else {
          freeTime = {
            freeTime: this.state.fromInput + ' - ' + this.state.toInput,
            freeTime2: this.state.fromInput2 + ' - ' + this.state.toInput2
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: '',
            fromInput2: '',
            toInput2: ''})
          this.props.closeModalHandler();
          break;
        }
      case 0:
        console.log('0 inputs added')
        if ((this.state.fromInput && this.state.toInput) ==='') {
          alert('Please fill out all available inputs')
          break;
        }
        else {
          freeTime = {
            freeTime: this.state.fromInput + ' - ' + this.state.toInput
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: ''})
          break;
        }
      default:
        console.log('error')
    }
  }

  render() {

    return (
      <div className="col d-flex">
        <Modal
          closeModal={this.hideModalHandler} 
          show={this.props.submitting}>
          <ScheduleModal
            addedInputs={this.state.addedInputs}
            changed={(event) => this.onChangeHandler(event)}
            fromInput={this.state.fromInput}
            toInput={this.state.toInput}
            fromInput2={this.state.fromInput2}
            toInput2={this.state.toInput2}
            fromInput3={this.state.fromInput3}
            toInput3={this.state.toInput3}
            plusClicked={this.addInputHandler}
            minusClicked={this.removeInputHandler}
            day={this.state.day}
            onClick={this.onClickSubmit}/>
        </Modal>
        <div className={classes.Schedule}>
          <h2>what is your weekly availability?</h2>
          <small className="text-muted">Click on each table cell to show other users the hours you are available to workout for each day of the week</small>
          <div>
            <small className="text-muted">Empty days will be considered as not available</small>
          </div>
          <ScheduleCalendar
            clearTime={this.hideModalHandler}
            day={this.state.day}
            freeTime={this.state.freeTime} 
            history={this.props.history}
            clicked={(day) => this.showModalHandler(day)}/>
          <Button click={this.onSkipHandler}>Skip</Button>
          <div>
            <small className="text-muted">Feel free to skip, you can always update your availability later!</small>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    submitting: state.setup.submitting,
    lifts: state.setup.lifts,
    goals: state.setup.goals,
    profile: state.setup.profile,
    fullName: state.auth.fullName,
    userKey: state.setup.userKey
  }
}


const mapDispatchToProps = dispatch => {
  return {
    closeModalHandler: () => dispatch(actionCreators.closeModal()),
    openModalHandler: () => dispatch(actionCreators.openModal()),
    submitUserProfile: (key, token, userProfile) => dispatch(actionPumpr.updateProfile(key, token, userProfile)),
    clearSetUpHandler: () => dispatch(actionCreators.clearSetUpData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymSchedule);