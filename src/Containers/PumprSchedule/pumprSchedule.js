import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';
import './pumprSchedule.css';

class PumprSchedule extends Component {
  state = {
    profile: null
  }
  componentDidMount() {
    console.log('schedule mounted')
    if (this.props.data === "" && this.props.ownData) {
      const {profile} = this.props.ownData.userSetup;
      this.setState({profile: profile}, () => this.updateCalender());
    }
    else if (this.props.data) {
      const {profile} = this.props.data.userSetup
      this.setState({profile: profile}, () => this.updateCalender());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data && this.state.profile === null) {
      console.log('set calendar data for other user')
      const {profile} = this.props.data.userSetup
      this.setState({profile: profile}, () => this.updateCalender());
    }
    if (this.props.ownData && this.state.profile === null) {
      console.log('set calendar data for current user')
      const {profile} = this.props.ownData.userSetup;
      this.setState({profile: profile}, () => this.updateCalender());
    }
    // Monday
    if (this.props.day === 'Monday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        monFreeTime: this.props.freeTime.freeTime,
        monFreeTime2: this.props.freeTime.freeTime2,
        monFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
    // Tuesday
    else if (this.props.day === 'Tuesday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        tuesFreeTime: this.props.freeTime.freeTime,
        tuesFreeTime2: this.props.freeTime.freeTime2,
        tuesFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
    // Wednesday
    else if (this.props.day === 'Wednesday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        wedFreeTime: this.props.freeTime.freeTime,
        wedFreeTime2: this.props.freeTime.freeTime2,
        wedFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
    // Thursday
    else if (this.props.day === 'Thursday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        thurFreeTime: this.props.freeTime.freeTime,
        thurFreeTime2: this.props.freeTime.freeTime2,
        thurFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
    // Friday
    else if (this.props.day === 'Friday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        friFreeTime: this.props.freeTime.freeTime,
        friFreeTime2: this.props.freeTime.freeTime2,
        friFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
    // Saturday
    else if (this.props.day === 'Saturday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        satFreeTime: this.props.freeTime.freeTime,
        satFreeTime2: this.props.freeTime.freeTime2,
        satFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
    // Sunday
    else if (this.props.day === 'Sunday' && this.props.freeTime != null && prevProps.freeTime == null) {
      this.setState(prevState => {
        return {
        sunFreeTime: this.props.freeTime.freeTime,
        sunFreeTime2: this.props.freeTime.freeTime2,
        sunFreeTime3: this.props.freeTime.freeTime3,
        dataInputted: true
      }}, () => {
        this.props.clearTime();
        this.postUpdateCalendar();
      })
    }
  }

  updateCalender = () => {
    // if true, user has inputted schedule data
    if (this.state.profile.monday) {
      this.setState({
        // Monday
        monFreeTime: this.state.profile.monday[0],
        monFreeTime2: this.state.profile.monday[1],
        monFreeTime3: this.state.profile.monday[2],
        // Tuesday
        tuesFreeTime: this.state.profile.tuesday[0],
        tuesFreeTime2: this.state.profile.tuesday[1],
        tuesFreeTime3: this.state.profile.tuesday[2],
        // Wednesday
        wedFreeTime: this.state.profile.wednesday[0],
        wedFreeTime2: this.state.profile.wednesday[1],
        wedFreeTime3: this.state.profile.wednesday[2],
        // Thursday
        thurFreeTime: this.state.profile.thursday[0],
        thurFreeTime2: this.state.profile.thursday[1],
        thurFreeTime3: this.state.profile.thursday[2],
        // Friday
        friFreeTime: this.state.profile.friday[0],
        friFreeTime2: this.state.profile.friday[1],
        friFreeTime3: this.state.profile.friday[2],
        // Saturday
        satFreeTime: this.state.profile.saturday[0],
        satFreeTime2: this.state.profile.saturday[1],
        satFreeTime3: this.state.profile.saturday[2],
        // Sunday
        sunFreeTime: this.state.profile.sunday[0],
        sunFreeTime2: this.state.profile.sunday[1],
        sunFreeTime3: this.state.profile.sunday[2]
      })
    }
  }

  // Update Calendar
  postUpdateCalendar = () => {    
    console.log('update calendar')
    const userKey = this.props.data.id;
    const token = localStorage.getItem('token');
    const gymSchedule = {
      monday: [this.state.monFreeTime, this.state.monFreeTime2, this.state.monFreeTime3, 0],
      tuesday: [this.state.tuesFreeTime, this.state.tuesFreeTime2, this.state.tuesFreeTime3, 0],
      wednesday: [this.state.wedFreeTime, this.state.wedFreeTime2, this.state.wedFreeTime3, 0],
      thursday: [this.state.thurFreeTime, this.state.thurFreeTime2, this.state.thurFreeTime3, 0],
      friday: [this.state.friFreeTime, this.state.friFreeTime2, this.state.friFreeTime3, 0],
      saturday: [this.state.satFreeTime, this.state.satFreeTime2, this.state.satFreeTime3, 0],
      sunday: [this.state.sunFreeTime, this.state.sunFreeTime2, this.state.sunFreeTime3, 0],
    }
    const copyProfile = Object.assign({}, this.props.data.userSetup.profile);
    const updateProfile = Object.assign(copyProfile, gymSchedule);
    const userSetUp = {
      lifts: this.props.data.userSetup.lifts,
      goals: this.props.data.userSetup.goals,
      profile: updateProfile,
      fullName: this.props.data.userSetup.fullName
    }
    const userProfile = {
      userSetup: userSetUp,
      userId: localStorage.getItem('userId'),
      id: this.props.data.id
    }
    console.log(userProfile);
    this.props.updateCalendarHandler(userKey, userProfile, token);
  }
  render () {
    let calendarDisplay = null;
    // if viewing other user's timeline page, display calendar without update functionality
    if (this.props.data.userId !== localStorage.getItem('userId')) {
      calendarDisplay = (
        <div className="my-3">
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
              {/* Monday */}
              <th scope="row" 
                className="table-input"
                style={{cursor: "default"}}>
                <p>{this.state.monFreeTime}</p>
                <p>{this.state.monFreeTime2}</p>
                <p>{this.state.monFreeTime3}</p>
              </th>
              {/* Tuesday */}
              <th className="table-input"
              style={{cursor: "default"}}>
                <p>{this.state.tuesFreeTime}</p>
                <p>{this.state.tuesFreeTime2}</p>
                <p>{this.state.tuesFreeTime3}</p>
              </th>
              {/* Wednesday */}
              <th className="table-input"
              style={{cursor: "default"}}>
                <p>{this.state.wedFreeTime}</p>
                <p>{this.state.wedFreeTime2}</p>
                <p>{this.state.wedFreeTime3}</p>
              </th>
              {/* Thursday */}
              <th className="table-input"
              style={{cursor: "default"}}>
                <p>{this.state.thurFreeTime}</p>
                <p>{this.state.thurFreeTime2}</p>
                <p>{this.state.thurFreeTime3}</p>
              </th>
              {/* Friday */}
              <th className="table-input"
              style={{cursor: "default"}}>
                <p>{this.state.friFreeTime}</p>
                <p>{this.state.friFreeTime2}</p>
                <p>{this.state.friFreeTime3}</p>
              </th>
              {/* Saturday */}
              <th className="table-input"
              style={{cursor: "default"}}>
                <p>{this.state.satFreeTime}</p>
                <p>{this.state.satFreeTime2}</p>
                <p>{this.state.satFreeTime3}</p>
              </th>
              {/* Sunday */}
              <th className="table-input border-right-0"
                style={{cursor: "default"}}>
                <p>{this.state.sunFreeTime}</p>
                <p>{this.state.sunFreeTime2}</p>
                <p>{this.state.sunFreeTime3}</p>
                </th>
            </tr>
          </tbody>
        </table>
      </div>
      )
    }
    // else, viewing own timeline, calendarDisplay has update calendar functionality
    else {
      calendarDisplay = (
        <div className="my-3">
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
              {/* Monday */}
              <th 
                scope="row" 
                className="table-input"
                onClick={() => this.props.clicked('Monday')}>
                <p>{this.state.monFreeTime}</p>
                <p>{this.state.monFreeTime2}</p>
                <p>{this.state.monFreeTime3}</p>
              </th>
              {/* Tuesday */}
              <th 
                onClick={() => this.props.clicked('Tuesday')}
                className="table-input">
                <p>{this.state.tuesFreeTime}</p>
                <p>{this.state.tuesFreeTime2}</p>
                <p>{this.state.tuesFreeTime3}</p>
              </th>
              {/* Wednesday */}
              <th
                onClick={() => this.props.clicked('Wednesday')} 
                className="table-input">
                <p>{this.state.wedFreeTime}</p>
                <p>{this.state.wedFreeTime2}</p>
                <p>{this.state.wedFreeTime3}</p>
              </th>
              {/* Thursday */}
              <th
                onClick={() => this.props.clicked('Thursday')} 
                className="table-input">
                <p>{this.state.thurFreeTime}</p>
                <p>{this.state.thurFreeTime2}</p>
                <p>{this.state.thurFreeTime3}</p>
              </th>
              {/* Friday */}
              <th
                onClick={() => this.props.clicked('Friday')} 
                className="table-input">
                <p>{this.state.friFreeTime}</p>
                <p>{this.state.friFreeTime2}</p>
                <p>{this.state.friFreeTime3}</p>
              </th>
              {/* Saturday */}
              <th
                onClick={() => this.props.clicked('Saturday')} 
                className="table-input">
                <p>{this.state.satFreeTime}</p>
                <p>{this.state.satFreeTime2}</p>
                <p>{this.state.satFreeTime3}</p>
              </th>
              {/* Sunday */}
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
      </div>
      )
    }
    return (
      <>
        {calendarDisplay}
      </>
    )
  }
}
// const mapStateToProps = state => {
//   return {
//     data: state.pumpr.data
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId)),
    updateCalendarHandler: (key, profile, token) => dispatch(actionCreators.updateCalendar(key, profile, token))
  }
}
export default connect(null, mapDispatchToProps)(PumprSchedule);