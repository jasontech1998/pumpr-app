import React, {Component} from 'react';
import classes from './findAPartner.module.css';
import './findAPartner.css';
import Aux from '../../hoc/Aux';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';
import verify from '../../Components/UI/Images/pumpr verified.png';

class FindAPartner extends Component {
  state = {
    nextCount: 0,
    displayUsers: null
  }
  
  componentDidMount() {
    this.setState({
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')},
      () => this.props.onFetchOtherProfile(this.state.token, this.state.userId));
    if (this.props.data) {
      this.props.removeDataPropHandler();
    }
  }
  componentDidUpdate() {
    if (this.props.otherUsers && this.state.displayUsers === null) {
      for (let user in this.props.otherUsers) {
        this.props.otherUsers[user].index = user
      };
      this.setState({displayUsers: this.props.otherUsers});
    };
  }

  onNextHandler = () => {
    this.setState((prevState) => {
      return {nextCount: prevState.nextCount + 1}
    });
  }
  onPrevHandler = () => {
    this.setState((prevState) => {
      return {nextCount: prevState.nextCount -1}
    });
  }

  // Navigate to clicked user's profile
  showProfileHandler = (userId, showCard) => {
    if (showCard) {
      this.props.history.push('/profile-about', userId);
    }
    else {
      console.log('dont push');
    }
  }

  render () {
    // Show Scroll Previous Chevron
    let prevChev = null;
    if (this.state.nextCount >= 1) {
      prevChev =  <i className="fas fa-2x fa-chevron-circle-left mt-3"
        onClick={this.onPrevHandler}></i>;
    };
    let nextChev = <i className="fas fa-2x fa-chevron-circle-right mt-3"
                      onClick={this.onNextHandler}></i>;
    if (this.props.otherUsers) {
      // Hide Scroll Next Chevron
      if (this.state.nextCount + 3 === this.props.otherUsers.length) {
        nextChev = null;
      };
    };
    
    
    // Dynamically generate other profiles
    let showUsers = null;
    let showVerify = null;
    if (this.state.displayUsers) {
      const displayedUsers = this.state.displayUsers;
      showUsers = (
        <Aux>
          {displayedUsers.map((user,index) => {
            if (user.value.userId === "sqwZZsb64ZR8gqEprgzH22uAf2t2" || user.value.userId === "YAfsBordplfPmXg0sDh5VV7yiyS2") {
              showVerify = <img src={verify} alt="verify-icon" className="pumprVerify" style={{width: "20px", height: "20px"}}/>;
            }
            else {
              showVerify = null;
            }
            let userData = user.value.userSetup;
            const {bench} = userData.lifts[0];
            const {squat} = userData.lifts[1];
            const {deadlift} = userData.lifts[2];
            let name = `${userData.fullName.firstName} ${userData.fullName.lastName}`;
            let picture = <img
                            alt="profile-pic" 
                            src={require('../../Components/UI/Icons/social.svg')} 
                            height="130"
                            width="130"
                            className={classes.Picture}/>;
            if (userData.profile.profileURL !== '') {
              picture = <img
                          alt="profile-pic" 
                          src={userData.profile.profileURL} 
                          height="130"
                          width="130"
                          className={classes.Picture}/>;
            };
            // Dynamically render className to show 3 cards at a time
            let showCard = '';
            let cursor = 'default';
            if (index >= this.state.nextCount && index <= this.state.nextCount + 2) {
              showCard = 'yesShow';
              cursor = 'pointer';
            }
            return (
              <div 
                onClick={() => this.showProfileHandler(user.value.userId, showCard)}
                key={user.key}
                className="card expand mx-3"
                id={showCard}
                style={{boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.25)', cursor: `${cursor}`, backgroundColor:'#fff'}}>
                <div className={classes.Header}></div>
                {picture}
                <div className="nameWrapper justify-content-center align-items-center">
                  <h5 className="card-title" style={{fontWeight:'600'}}>{name}</h5>
                  {showVerify}
                </div>
                <span className="experienceCard">{userData.goals.experience}</span>
                <div className={classes.Location}>
                  <div 
                    style={{width: '100%'}}
                    className="d-flex justify-content-between">
                    <span className={classes.GymLocation}>
                      <i className="fas fa-map-marker-alt pin"></i> {userData.profile.gym}</span>
                    <span className={classes.GymLocation}>{userData.profile.city}</span>
                  </div>
                </div>
                <div className={classes.Body}>
                  <div className={classes.FirstLifts}>
                    <img 
                      className={classes.Icon}
                      src={require('../../Components/UI/Icons/bench.svg')} 
                      alt="icon" 
                      height="45" width="45"/>
                    <span className={classes.LiftsText}>{bench.weight} lbs {bench.sets}x{bench.reps}</span>
                  </div>
                  <div className={classes.Lifts}>
                    <img 
                      className={classes.Icon}
                      src={require('../../Components/UI/Icons/squat.svg')} 
                      alt="icon" 
                      height="45" width="45"/>
                    <span className={classes.LiftsText}>{squat.weight} lbs {squat.sets}x{squat.reps}</span>
                  </div>
                  <div className={classes.LastLifts}>
                    <img 
                      className={classes.Icon}
                      src={require('../../Components/UI/Icons/deadlift.svg')} 
                      alt="icon" 
                      height="45" width="45"/>
                    <span 
                      className={classes.LiftsText}>
                        {deadlift.weight} lbs {deadlift.sets}x{deadlift.reps}
                    </span>
                  </div>
                </div>
              </div>
            )})}
        </Aux>
      )
    }
    return (
      <div className="col">
        <h3 className="mb-4">Find A Partner</h3>
        <div className="cards-slider my-3">
          <div className="cards-slider-wrapper" style={{transform: `translateX(-${this.state.nextCount*(200)}%)`}}>
            {showUsers}
          </div>
        </div>
        {prevChev}
        {nextChev}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    data: state.pumpr.data,
    token: state.auth.token,
    otherUsers: state.pumpr.otherUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOtherProfile: (token, userId) => dispatch(actionCreators.fetchOtherProfile(token, userId)),
    removeDataPropHandler: () => dispatch(actionCreators.removeData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindAPartner);