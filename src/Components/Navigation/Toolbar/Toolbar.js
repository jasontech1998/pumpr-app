import React from 'react';
import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div 
      className={classes.pumpr}
      onClick={props.clicked}
      style={{cursor: 'pointer'}}>pumpr</div>
    <nav className={classes.DesktopOnly}>
      <NavItems token={props.token}/>
    </nav>
  </header>
)

export default toolbar;