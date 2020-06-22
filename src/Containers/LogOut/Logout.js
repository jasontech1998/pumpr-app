import React, {Component} from 'react';
import * as actionCreators from '../../store/actions/actionAuth';
import * as actionPumpr from '../../store/actions/actionPumpr';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

  componentDidMount = () => {
   this.props.logOutHandler();
   this.props.logOutPumprHandler();
  }
  
    render () {
      return (
        <Redirect to='/' />
      );
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logOutHandler: () => dispatch(actionCreators.logout()),
      logOutPumprHandler: () => dispatch(actionPumpr.logoutPumpr())
    }
  }
  
  export default connect(null, mapDispatchToProps)(Logout);