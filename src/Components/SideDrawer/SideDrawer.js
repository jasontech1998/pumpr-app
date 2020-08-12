import React from 'react';
import NavItems from '../Navigation/NavItems/NavItems';
import Backdrop from '../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';


const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <div className={classes.DivForMedia}>
        <Backdrop show={props.open} clicked={props.closed} history={props.history}/>
      </div> 
      <div className={attachedClasses.join(' ')}>
        <nav>
          <NavItems token={props.token} showSideDrawer={true} clicked={props.closed}/>
        </nav>
      </div>
    </>
  )
}

export default sideDrawer;