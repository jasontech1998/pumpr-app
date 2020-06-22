import React from 'react';
import classes from './AboutToolbar.module.css';
import {NavLink} from 'react-router-dom';

const aboutToolbar = (props) => {
  let aboutStyle = ''
  let timelineStyle = ''
  if (props.history.location.pathname === '/profile-about') {
    aboutStyle = classes.active
  }
  else if (props.history.location.pathname === '/profile-timeline') {
    timelineStyle = classes.active
  }
  return (
    <header className={classes.aboutToolbar}>
      <div></div>
      <nav className={classes.DesktopOnly}>
        <ul>
          <li>
            <NavLink to='/profile-timeline' className={timelineStyle}>Timeline</NavLink>
          </li>
          <li>
            <NavLink to="/profile-about" className={aboutStyle}>About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  ) 
}

export default aboutToolbar;