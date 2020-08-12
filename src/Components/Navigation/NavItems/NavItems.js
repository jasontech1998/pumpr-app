import React, {Component} from 'react';
import classes from './NavItems.module.css';
import './NavItems.css';
import NavItem from '../NavItem/NavItem';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';
class NavItems extends Component {

  componentDidMount = () => {
    // user is logged in
    if (localStorage.getItem('userId')) {
      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      this.props.onFetchProfile(token ,userId);
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.userId !== this.props.userId) {
      this.props.onFetchProfile(this.props.token, this.props.userId)
    };
  }

  render () {
    let showNavBar = null;
    let userId = localStorage.getItem('userId');
    let showProfilePic =  <img
                            alt="profile-pic" 
                            src={require('../../UI/Icons/social.svg')}
                            height="40"
                            width="40"
                            className="rounded-circle"></img>;
    if (this.props.ownData) {
      // Show Profile Pic if uploaded
      const {profile} = this.props.ownData.userSetup;
      if (profile.profileURL) {
        showProfilePic = (
          <img
            alt="profile-pic" 
            src={profile.profileURL}
            height="40"
            width="40"
            className="rounded-circle"></img>
        )
      };
    };
    const profileTarget = {
      pathname: "/profile-about",
      key: Math.random,
      userId: userId
    };
    // User is logged in
    if (this.props.token && this.props.ownData) {
      if (!this.props.showSideDrawer) {
        showNavBar = (
          <>
            <NavItem link="/find-a-partner">Find a Partner</NavItem> 
            <NavItem link="/messages"> Messages</NavItem>
            <li className="nav-item dropdown">
                <a href="/profile-about" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {/* User Profile Image */}
                  {showProfilePic}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{transform: "translate3d(-15px, 56px, 0px)"}}>
                  <NavLink
                    className="dropdown-item"
                    to={profileTarget}>Profile
                  </NavLink>
                  <NavLink 
                    to='/profile-settings'
                    className="dropdown-item">Settings
                  </NavLink>
                  <NavLink 
                    to='/log-out'
                    className="dropdown-item">Log Out
                  </NavLink>
                </div>
              </li>
            </>
        )
      }
      // if side drawer is open
      else {
        showNavBar = (
          <>
            <NavItem link="/dashboard" clicked={this.props.clicked}>Dashboard</NavItem> 
            <NavItem link="/find-a-partner" clicked={this.props.clicked}>Find a Partner</NavItem> 
            <NavItem link="/messages" clicked={this.props.clicked}>Messages</NavItem>
            <NavItem link="/profile-about" clicked={this.props.clicked}>Profile</NavItem> 
            <NavItem link="/profile-settings" clicked={this.props.clicked}>Settings</NavItem> 
            <NavItem link="/log-out" clicked={this.props.clicked}>Log Out</NavItem>
          </>
        )
      }
    }
    // if user is on onboarding process
    else if (this.props.token && !this.props.ownData) {
      showNavBar = (
        <>
          <li className="nav-item dropdown">
              <a href="/profile-about" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {/* User Profile Image */}
                {showProfilePic}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink 
                  to='/log-out'
                  className="dropdown-item">Log Out
                </NavLink>
              </div>
            </li>
          </>
      )
    }
    // Not logged in
    else if (!this.props.token) {
      showNavBar = (
        <>
          <NavItem link="/help">Help</NavItem>
          <NavItem link="/log-in">Log In</NavItem>
        </>
      )
    }
    return (
      <ul className={classes.NavItems}>
        {showNavBar}
      </ul>
    )
  }
}
const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData,
    data: state.pumpr.data,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchNavProfile(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavItems);