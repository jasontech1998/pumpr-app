import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
  return (
    <button
    onClick={props.click}
    className={classes.Button}
    type="submit">{props.children}</button>
  )
}

export default button;