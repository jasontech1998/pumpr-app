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
      console.log('user logged in')
      let userId = localStorage.getItem('userId')
      let token = localStorage.getItem('token')
      this.props.onFetchProfile(token ,userId)
    }
    else {
      console.log('user not logged in')
    }
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.userId !== this.props.userId) {
      this.props.onFetchProfile(this.props.token, this.props.userId)
    }
  }
  render () {
    let userId = localStorage.getItem('userId')
    let showProfilePic =  <img
                            alt="profile-pic" 
                            src={require('../../UI/Icons/social.svg')}
                            height="40"
                            width="40"
                            className="rounded-circle"></img>
    if (this.props.ownData) {
      // Show Profile Pic if uploaded
      const {profile} = this.props.ownData.userSetup
      if (profile.profileURL) {
        showProfilePic = (
          <img
            alt="profile-pic" 
            src={profile.profileURL}
            height="40"
            width="40"
            className="rounded-circle"></img>
        )
      }
    }
    
    return (
      <ul className={classes.NavItems}>
        {this.props.token 
          ? <NavItem link="/find-a-partner">Find a Partner</NavItem> 
          : <NavItem link="/help">Help</NavItem> }
        {this.props.token 
          ? <NavItem link="/messages"> Messages</NavItem>
          : null
        }
        {this.props.token
        ? <li className="nav-item dropdown">
            <a href="/profile-about" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {/* User Profile Image */}
              {showProfilePic}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink 
                className="dropdown-item"
                to={{pathname: '/profile-about', userId}}>Profile
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
        : <NavItem link="/log-in">Log In</NavItem>}
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