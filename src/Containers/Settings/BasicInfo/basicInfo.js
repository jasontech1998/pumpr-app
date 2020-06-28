import React, {Component} from 'react';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import {connect} from 'react-redux';
import {storage} from '../../../Firebase/index';
import * as actionCreators from '../../../store/actions/actionPumpr';
import classes from '../../ProfileSetUp/ProfilePicAndBio/PicAndBio.module.css';

class BasicInfo extends Component {

  state = {
    firstName: this.props.userSetup.fullName.firstName,
    lastName: this.props.userSetup.fullName.lastName,
    bio: this.props.userSetup.profile.profileBio,
    userLocation: this.props.userSetup.profile.location,
    stateChanged: false
  };

  onSelectLocation = (response) => {
    let userLocation = response.description;
    this.setState({
      userLocation: userLocation,
      locationName: response.terms[0].value,
      locationCity: response.terms[2].value,
      stateChanged: true
    });
  }

 onSaveHandler = () => {
   if (!this.state.stateChanged) {
     console.log('nothing changed');
   }
  //  if settings have been changed, save data and send to database
   else {
     let profile = null;
     console.log(this.props.ownData);
     const userKey = this.props.ownData.id;
     const token = localStorage.getItem('token');
     //  copy profile data
    const copyProfile = Object.assign({}, this.props.ownData.userSetup.profile);
    //  check if location has been updated
    if (this.state.locationCity) {
      console.log('location changed');
      // update location and bio
      profile = {
        city: this.state.locationCity,
        gym: this.state.locationName,
        location: this.state.userLocation,
        profileBio: this.state.bio
      };
    }
    // if user changed profile picture, update profile pic and bio
    else if (this.state.url) {
      profile = {
        profileURL: this.state.url,
        profileBio: this.state.bio
      };
    }
    // if user didn't change either location or picture, just update bio
    else {
      profile = {profileBio: this.state.bio};
    }
    const updateProfile = Object.assign(copyProfile, profile);
    const fullName = {firstName: this.state.firstName, lastName: this.state.lastName};
    
    //  initialize data to be sent to database
    const userSetup = {
      fullName: fullName,
      profile: updateProfile,
      lifts: this.props.ownData.userSetup.lifts,
      goals: this.props.ownData.userSetup.goals
    };
    const userProfile = {
      userSetup: userSetup,
      userId: localStorage.getItem('userId'),
      id: userKey
    };
    // send data to database to be patched with updated userProfile data
    this.props.onUpdateProfileHandler(userKey, token, userProfile);
   }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      stateChanged: true
    });
  }
  onChooseHandler = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({image: image}, this.showImage);
    }
  }
  showImage = () => {
    console.log('show image');
    // object destructuring
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed",
      () => {
        storage.ref("images").child(image.name).getDownloadURL()
          .then(url => 
            this.setState({url: url, stateChanged: true}));
      }
    );
  }
  render () {
    let userPicture = null;
    if (this.props.ownData) {
      userPicture = this.props.ownData.userSetup.profile.profileURL;
      if (userPicture === "") {
        userPicture = `/static/media/social.15eeae14.svg`;
      };
    };
    if (this.state.url) {
      userPicture = this.state.url;
    };
    
    return (
      <>
        <h1>Edit your info</h1>
        {/* Edit profile pic */}
        <input 
          onChange={(event) => this.onChooseHandler(event)}
          type="file" 
          accept="image/*"
          multiple= {false}
          ref={(ref) => this.upload = ref}
          hidden="hidden" />
        <img
          onClick={() => this.upload.click()}
          alt="profile-pic" 
          src={userPicture}
          height="130"
          width="130"
          className="rounded-circle my-3"
          style={{cursor: "pointer"}}/>
        <div className="row mt-3 justify-content-center">
          <div className="col-6 d-flex flex-column" style={{maxWidth: "240px"}}>
            <span className="settingsTitle">First Name</span>
            <input
              onChange={(event) => this.onChangeHandler(event)}
              value={this.state.firstName}
              name="firstName"
              className="settingsInput" 
              type="text" />
          </div>
          <div className="col-6 d-flex flex-column" style={{maxWidth: "240px"}}>
            <span className="settingsTitle">Last Name</span>
            <input
              onChange={(event) => this.onChangeHandler(event)}
              value={this.state.lastName}
              name="lastName"
              className="settingsInput" 
              type="text" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <span className="settingsTitle">Bio</span>
            <textarea
              onChange={(event) => this.onChangeHandler(event)}
              className={classes.Bio}
              rows="3"
              name='bio'
              value={this.state.bio}
              />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <span className="settingsTitle">Location</span>
            <GooglePlacesAutocomplete
              placeholder={this.props.userSetup.profile.location}
              inputStyle={{marginTop: '20px',
                          textAlign: 'center',
                          minWidth: '50%',
                          width: '55%'}}
              onSelect={(response) => this.onSelectLocation(response)} />
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={this.onSaveHandler} 
            className="offerBtn">Save</button>
        </div>
      </>
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
    onUpdateProfileHandler: (key, token, userProfile) => dispatch(actionCreators.updateProfile(key, token, userProfile))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);