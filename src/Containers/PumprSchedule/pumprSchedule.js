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

  componentDidUpdate() {
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
  }

  updateCalender = () => {
    // if true, user has inputted schedule data
    if (this.state.profile.monday) {
      this.setState({
        // Monday
        monFreeTime: this.state.profile.monday[0],
        monFreeTime1: this.state.profile.monday[1],
        monFreeTime2: this.state.profile.monday[2],
        // Tuesday
        tuesFreeTime: this.state.profile.tuesday[0],
        tuesFreeTime1: this.state.profile.tuesday[1],
        tuesFreeTime2: this.state.profile.tuesday[2],
        // Wednesday
        wedFreeTime: this.state.profile.wednesday[0],
        wedFreeTime1: this.state.profile.wednesday[1],
        wedFreeTime2: this.state.profile.wednesday[2],
        // Thursday
        thurFreeTime: this.state.profile.thursday[0],
        thurFreeTime1: this.state.profile.thursday[1],
        thurFreeTime2: this.state.profile.thursday[2],
        // Friday
        friFreeTime: this.state.profile.friday[0],
        friFreeTime1: this.state.profile.friday[1],
        friFreeTime2: this.state.profile.friday[2],
        // Saturday
        satFreeTime: this.state.profile.saturday[0],
        satFreeTime1: this.state.profile.saturday[1],
        satFreeTime2: this.state.profile.saturday[2],
        // Sunday
        sunFreeTime: this.state.profile.sunday[0],
        sunFreeTime1: this.state.profile.sunday[1],
        sunFreeTime2: this.state.profile.sunday[2]
      })
    }
  }
  render () {
    return (
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
              <th scope="row" className="table-input">
                <p>{this.state.monFreeTime}</p>
                <p>{this.state.monFreeTime1}</p>
                <p>{this.state.monFreeTime2}</p>
              </th>
              {/* Tuesday */}
              <th className="table-input">
                <p>{this.state.tuesFreeTime}</p>
                <p>{this.state.tuesFreeTime1}</p>
                <p>{this.state.tuesFreeTime2}</p>
              </th>
              {/* Wednesday */}
              <th className="table-input">
                <p>{this.state.wedFreeTime}</p>
                <p>{this.state.wedFreeTime1}</p>
                <p>{this.state.wedFreeTime2}</p>
              </th>
              {/* Thursday */}
              <th className="table-input">
                <p>{this.state.thurFreeTime}</p>
                <p>{this.state.thurFreeTime1}</p>
                <p>{this.state.thurFreeTime2}</p>
              </th>
              {/* Friday */}
              <th className="table-input">
                <p>{this.state.friFreeTime}</p>
                <p>{this.state.friFreeTime1}</p>
                <p>{this.state.friFreeTime2}</p>
              </th>
              {/* Saturday */}
              <th className="table-input">
                <p>{this.state.satFreeTime}</p>
                <p>{this.state.satFreeTime1}</p>
                <p>{this.state.satFreeTime2}</p>
              </th>
              {/* Sunday */}
              <th className="table-input border-right-0">
                <p>{this.state.sunFreeTime}</p>
                <p>{this.state.sunFreeTime1}</p>
                <p>{this.state.sunFreeTime2}</p>
                </th>
            </tr>
          </tbody>
        </table>
      </div>
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
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId))
  }
}
export default connect(null, mapDispatchToProps)(PumprSchedule);