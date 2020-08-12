import React from 'react';
import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => {
  // if onboarding process
  if (props.token && !props.ownData) {
    return (
      <header className={classes.Toolbar}>
        <div className={classes.pumpr}>pumpr</div>
        <nav className={classes.MobileOnly}>
          <NavItems token={props.token}/>
        </nav>
      </header>
    )
  }
  // if user is logged in navbar
  else if (props.token && props.ownData){
    return (
      <header className={classes.Toolbar}>
        <div 
          onClick={props.clickedBurger}
          className={classes.Burger}>
            <i className="fas fa-bars fa-2x"></i></div>
        <div 
          className={classes.pumprAuth}
          onClick={props.clicked}
          style={{cursor: 'pointer'}}>pumpr</div>
        <nav className={classes.navAuth}>
          <NavItems token={props.token}/>
        </nav>
      </header>
    )
    // landing page navbar
  } else {
    return (
      <header className={classes.Toolbar}>
          <div 
            className={classes.pumpr}
            onClick={props.clicked}
            style={{cursor: 'pointer'}}>pumpr</div>
          <nav className={classes.MobileOnly}>
            <NavItems token={props.token}/>
          </nav>
        </header>
    )
  }
}

export default toolbar;