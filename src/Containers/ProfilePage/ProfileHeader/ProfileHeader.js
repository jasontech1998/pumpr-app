import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import './ProfileHeader.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';
import verify from '../../../Components/UI/Images/pumpr verified.png';

class ProfileHeader extends Component {

  goToMessagesHandler = () => {
    this.props.history.push('/messages');
  }

  render () {
    let fullName = null;
    let experience = null;
    let showProfilePic = 
        <img 
          className='ml-3 mb-3'
          src={require('../../../Components/UI/Icons/social.svg')} 
          alt="icon" 
          height="125" width="125"/>;
    let showButton = <Button click={this.props.click}>Message</Button>;
    if (this.props.hasMessaged) {
      showButton = <Button click={this.goToMessagesHandler}>Message</Button>;
    };
    let showVerify = null;
    // if location.state is undefined or null, display current user's data
    if (this.props.history.location.state === undefined || this.props.history.location.state === null) {
      if (this.props.ownData) {
        // check if pumpr verified userid
        if (this.props.ownData.userId === "YAfsBordplfPmXg0sDh5VV7yiyS2" || this.props.ownData.userId === "sqwZZsb64ZR8gqEprgzH22uAf2t2") {
          showVerify = <img src={verify} alt="verify-icon" className="pumprVerify"/>;
        };
        experience = this.props.ownData.userSetup.goals.experience;
        // if viewing own profile, remove message button
        showButton = <button 
                      onClick={() => this.props.history.push('/profile-settings')}
                      className="editProfile">Edit profile</button>;
        let tempName = this.props.ownData.userSetup.fullName;
        fullName = `${tempName.firstName} ${tempName.lastName}`;
        const {profile} = this.props.ownData.userSetup;
        if (profile.profileURL) {
          showProfilePic = (
            <img
              alt="profile-pic" 
              src={profile.profileURL}
              height="150"
              width="150"
              className="rounded-circle mb-3"></img>
          );
        };
      }
    }
    // display other user data
    else if (this.props.history.location.state) {
      if (this.props.data) {
        // check if pumpr verified userid
        if (this.props.data.userId === "sqwZZsb64ZR8gqEprgzH22uAf2t2" || this.props.data.userId === "YAfsBordplfPmXg0sDh5VV7yiyS2") {
          showVerify = <img src={verify} alt="verify-icon" className="pumprVerify"/>;
        };
        experience = this.props.data.userSetup.goals.experience;
        const userId = localStorage.getItem('userId');
        // if viewing own profile, remove message button
        if (userId === this.props.data.userId) {
          showButton = null;
        };
        let tempName = this.props.data.userSetup.fullName;
        fullName = `${tempName.firstName} ${tempName.lastName}`;
        const {profile} = this.props.data.userSetup;
        if (profile.profileURL) {
          showProfilePic = (
            <img
              alt="profile-pic" 
              src={profile.profileURL}
              height="150"
              width="150"
              className="rounded-circle mb-3"></img>
          );
        };
      }
    }

    return (
      <div className="row">
        <div className="col-9 d-flex">
          {/* Profile Picture */}
          {showProfilePic}
          <div className="nameExp">
            <div className="nameWrapper">
              <h3 className="nameBio">{fullName}</h3>
              {showVerify}
            </div>
            <span className="experienceBio">{experience}</span>
          </div>
        </div>
        <div className="col-3 d-flex">
          {showButton}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.pumpr.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);