import React, {Component} from 'react';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

import classes from '../../ProfileSetUp/ProfilePicAndBio/PicAndBio.module.css';

class BasicInfo extends Component {

  state = {
    firstName: this.props.userSetup.fullName.firstName,
    lastName: this.props.userSetup.fullName.lastName,
    bio: this.props.userSetup.profile.profileBio,
    userLocation: this.props.userSetup.profile.location
  }

  onSelectLocation = (response) => {
    let userLocation = response.description;
    this.setState({
      userLocation: userLocation,
      locationName: response.terms[0].value,
      locationCity: response.terms[2].value
    })
  }

 onSaveHandler = () => {
    console.log(this.state)
  }
  onChangeHandler = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render () {
    return (
      <>
          <h1>Edit your info</h1>
            <div className="row mt-3">
              <div className="col-6 d-flex flex-column">
                <span className="settingsTitle">First Name</span>
                <input
                  onChange={(event) => this.onChangeHandler(event)}
                  value={this.state.firstName}
                  name="firstName"
                  className="settingsInput" 
                  type="text" />
              </div>
              <div className="col-6 d-flex flex-column">
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
                  rows="6"
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
                              width: '60%' }}
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

export default BasicInfo;