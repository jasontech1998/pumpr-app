import React, {Component} from 'react';
import './scheduleCalendar.css';
import Button from '../../../Components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionSetup';
import * as actionPumpr from '../../../store/actions/actionPumpr';

class scheduleCalendar extends Component {
  state = {
    dataInputted: false
  }
  
  componentDidUpdate = () => {
    // Monday
    if (this.props.day === 'Monday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        monFreeTime: this.props.freeTime.freeTime,
        monFreeTime2: this.props.freeTime.freeTime2,
        monFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
    // Tuesday
    else if (this.props.day === 'Tuesday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        tuesFreeTime: this.props.freeTime.freeTime,
        tuesFreeTime2: this.props.freeTime.freeTime2,
        tuesFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
    // Wednesday
    else if (this.props.day === 'Wednesday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        wedFreeTime: this.props.freeTime.freeTime,
        wedFreeTime2: this.props.freeTime.freeTime2,
        wedFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
    // Thursday
    else if (this.props.day === 'Thursday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        thurFreeTime: this.props.freeTime.freeTime,
        thurFreeTime2: this.props.freeTime.freeTime2,
        thurFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
    // Friday
    else if (this.props.day === 'Friday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        friFreeTime: this.props.freeTime.freeTime,
        friFreeTime2: this.props.freeTime.freeTime2,
        friFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
    // Saturday
    else if (this.props.day === 'Saturday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        satFreeTime: this.props.freeTime.freeTime,
        satFreeTime2: this.props.freeTime.freeTime2,
        satFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
    // Sunday
    else if (this.props.day === 'Sunday' && this.props.freeTime != null) {
      this.setState(prevState => {
        return {
        sunFreeTime: this.props.freeTime.freeTime,
        sunFreeTime2: this.props.freeTime.freeTime2,
        sunFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, this.props.clearTime);
    }
  }
  // Submit Schedule to Redux
  submitSchedule = () => {
    const gymSchedule = {
      monday: [this.state.monFreeTime, this.state.monFreeTime2, this.state.monFreeTime3, 0],
      tuesday: [this.state.tuesFreeTime, this.state.tuesFreeTime2, this.state.tuesFreeTime3, 0],
      wednesday: [this.state.wedFreeTime, this.state.wedFreeTime2, this.state.wedFreeTime3, 0],
      thursday: [this.state.thurFreeTime, this.state.thurFreeTime2, this.state.thurFreeTime3, 0],
      friday: [this.state.friFreeTime, this.state.friFreeTime2, this.state.friFreeTime3, 0],
      saturday: [this.state.satFreeTime, this.state.satFreeTime2, this.state.satFreeTime3, 0],
      sunday: [this.state.sunFreeTime, this.state.sunFreeTime2, this.state.sunFreeTime3, 0],
    };
    const copyProfile = Object.assign({}, this.props.profile);
    const updateProfile = Object.assign(copyProfile, gymSchedule);
    const userSetUp = {
      lifts: this.props.lifts,
      goals: this.props.goals,
      profile: updateProfile,
      fullName: this.props.fullName
    };
    const userProfile = {
      userSetup: userSetUp,
      userId: this.props.userId
    };
    const key = this.props.userKey;
    const token = this.props.token;
    // User Profile Set Up Complete, send to database
    this.props.submitUserProfile(key, token, userProfile);
    // Clear Set Up Data
    this.props.clearSetUpHandler();
    // Wait 1 second before pushing to dashboard
    setTimeout(() => this.props.history.push('/dashboard'), 1000);
  }

  render () {
    let showNext = null;
    if (this.state.dataInputted) {
      showNext = <Button click={this.submitSchedule}>Next</Button>;
    };
    return (
      <div style={{marginTop: "40px", marginBottom: "16px"}}>
        <table className="table">
          <thead className="thead">
            <tr>
              <th scope="col">Monday</th>
              <th scope="col">Tuesday</th>
              <th scope="col">Wednesday</th>
              <th scope="col">Thursday</th>
              <th scope="col">Friday</th>
              <th scope="col">Saturday</th>
              <th scope="col">Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th 
                scope="row"
                className="table-input"
                onClick={() => this.props.clicked('Monday')}>
                <p>{this.state.monFreeTime}</p>
                <p>{this.state.monFreeTime2}</p>
                <p>{this.state.monFreeTime3}</p>
              </th>
              <th 
                onClick={() => this.props.clicked('Tuesday')}
                className="table-input">
                <p>{this.state.tuesFreeTime}</p>
                <p>{this.state.tuesFreeTime2}</p>
                <p>{this.state.tuesFreeTime3}</p>
                </th>
              <th 
                onClick={() => this.props.clicked('Wednesday')}
                className="table-input">
                <p>{this.state.wedFreeTime}</p>
                <p>{this.state.wedFreeTime2}</p>
                <p>{this.state.wedFreeTime3}</p>
                </th>
              <th 
                onClick={() => this.props.clicked('Thursday')}
                className="table-input">
                <p>{this.state.thurFreeTime}</p>
                <p>{this.state.thurFreeTime2}</p>
                <p>{this.state.thurFreeTime3}</p>
                </th>
              <th 
                onClick={() => this.props.clicked('Friday')}
                className="table-input">
                <p>{this.state.friFreeTime}</p>
                <p>{this.state.friFreeTime2}</p>
                <p>{this.state.friFreeTime3}</p>
                </th>
              <th 
                onClick={() => this.props.clicked('Saturday')}
                className="table-input">
                <p>{this.state.satFreeTime}</p>
                <p>{this.state.satFreeTime2}</p>
                <p>{this.state.satFreeTime3}</p>
                </th>
              <th 
                onClick={() => this.props.clicked('Sunday')}
                className="table-input border-right-0">
                <p>{this.state.sunFreeTime}</p>
                <p>{this.state.sunFreeTime2}</p>
                <p>{this.state.sunFreeTime3}</p>
                </th>
            </tr>
          </tbody>
        </table>
        {showNext}
      </div>
      
    )
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    lifts: state.setup.lifts,
    goals: state.setup.goals,
    profile: state.setup.profile,
    fullName: state.auth.fullName,
    userKey: state.auth.profileKey
  }
}
const mapDispatchToProps = dispatch => {
  return {
    submitUserProfile: (key, token, userProfile) => dispatch(actionPumpr.updateProfile(key, token, userProfile)),
    clearSetUpHandler: () => dispatch(actionCreators.clearSetUpData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(scheduleCalendar);