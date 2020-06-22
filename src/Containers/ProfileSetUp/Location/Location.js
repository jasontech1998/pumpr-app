import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';

import classes from './Location.module.css';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionSetup';

class Location extends Component {
  state = {
    userLocation: '',
    locationName: '',
    locationCity: ''
  }
  onSelectLocation = (response) => {
    let userLocation = response.description;
    this.setState({
      userLocation: userLocation,
      locationName: response.terms[0].value,
      locationCity: response.terms[2].value
    })
  }

  onClickHandler = () => {
    const locationData = {
      location: this.state.userLocation,
      gym: this.state.locationName,
      city: this.state.locationCity}
    this.props.locationHandler(locationData);
    this.props.history.push('/gym-schedule');
  }
  render () {
    return (
      <div className="col d-flex justify-content-center">
        <div className={classes.Location}>
          <h2 className="text-center">where do you workout?</h2>
          <div className="d-flex justify-content-center">
            <GooglePlacesAutocomplete
              placeholder='Enter gym address'
              className={classes.Google}
              inputStyle={{marginTop: '20px',
                          textAlign: 'center',
                          minWidth: '50%',
                          width: '60%' }}
              onSelect={(response) => this.onSelectLocation(response)} />
          </div>
          <div style={{height: '250px'}}></div>
          <Button click={this.onClickHandler}>Next</Button>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    locationHandler: (location) => dispatch(actionCreators.submitLocation(location))
  }
}

export default connect(null, mapDispatchToProps)(Location);