import React, {Component} from 'react';
import BasicInfo from './BasicInfo/basicInfo';
import SettingLifts from './LiftsSettings/settingsLifts';
import Goals from '../ProfileSetUp/LiftsAndGoals/Goals';
import ScheduleSettings from './ScheduleSettings/ScheduleSettings';
import './Settings.css';

import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';

class Settings extends Component {
  state = {
    showSettings: 0
  };

  changeInfoDisplay = (type) => {
    if (type === 'lifts') {
      this.setState({showSettings: 1});
    }
    else if (type === 'basic') {
      this.setState({showSettings: 0});
    }
    else if (type === 'exp') {
      this.setState({showSettings: 2});
    }
    else if (type === 'schedule') {
      this.setState({showSettings: 3})
    }
  }

  render () {
    let basicInfo = null;
    let liftSetting = null;
    let expGoals = null;
    let gymSchedule = null;
    if (this.props.ownData && this.state.showSettings === 0) {
      const {userSetup} = this.props.ownData;
      basicInfo = <BasicInfo userSetup={userSetup}/>;
    }
    else if (this.props.ownData && this.state.showSettings === 1) {
      const {lifts} = this.props.ownData.userSetup;
      liftSetting = <SettingLifts lifts={lifts}/>;
    }
    else if (this.props.ownData && this.state.showSettings === 2) {
      const {goals} = this.props.ownData.userSetup;
      expGoals = <Goals history={this.props.history} goals={goals}/>;
    }
    else if (this.props.ownData && this.state.showSettings === 3) {
      const {profile} = this.props.ownData.userSetup;
      gymSchedule = <ScheduleSettings profile={profile} history={this.props.history}/>
    }

    return (
      <div className="col-12">
        <div className="row">
          <div 
            className="col-3 d-flex flex-column justify-content-end"
            style={{height: '250px'}}>
              <h3 
                onClick={() => this.changeInfoDisplay('basic')}
                className={`settingsNav ${this.state.showSettings === 0 ? "activeSet" : ""}`}>Basic Info</h3>
              <h3 
                onClick={() => this.changeInfoDisplay('lifts')}
                className={`settingsNav ${this.state.showSettings === 1 ? "activeSet" : ""}`}>Lifts</h3>
              <h3 
                onClick={() => this.changeInfoDisplay('exp')}
                className={`settingsNav ${this.state.showSettings === 2 ? "activeSet" : ""}`}>Experience & Interests</h3>
              <h3 
              onClick={() => this.changeInfoDisplay('schedule')}
              className={`settingsNav ${this.state.showSettings === 3 ? "activeSet" : ""}`}>Gym Schedule</h3>
          </div>
          <div className="col-9">
            {basicInfo}
            {liftSetting}
            {expGoals}
            {gymSchedule}
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
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);