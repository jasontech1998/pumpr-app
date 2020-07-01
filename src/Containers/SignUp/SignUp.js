import React, { Component } from 'react'
import classes from './SignUp.module.css';
import './SignUp.css';
import Lottie from 'react-lottie';
import animationData from '../../Components/UI/Lottie/squat.json';
import * as actionCreators from '../../store/actions/actionAuth';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class SignIn extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    fullName: '',
    isSignUp: true
  };
  
  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
      this.setState({
        missingName: true
      });
    }
    else {
      this.setState({
        missingName: false
      });
      const fullName = {firstName: this.state.firstName, lastName: this.state.lastName};
      // Create account and submit skeleton userProfile to database
      this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp, fullName);
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render () {
    // initialize error message variable
    let errorMsg = null;
    // Lottie Animation 
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    // Redirect to lifts if signUp is successful
    if (this.props.doneSignUp) {
      return <Redirect to="/lifts"/>;
    };
    // Sign Up Error Handling
    if (this.props.error) {
      if (this.props.error.message === "EMAIL_EXISTS") {
        errorMsg = <p className="errorMsg">An account with this e-mail already exists.</p>;
      }
      else if (this.props.error.message === "WEAK_PASSWORD : Password should be at least 6 characters") {
        errorMsg = <p className="errorMsg">Your password must be at least 6 characters.</p>;
      }
    }
    if (this.state.missingName) {
      errorMsg = <p className="errorMsg">Please enter your full name</p>;
    }
    return (
      <>
        {/* Left Side */}
        <div className="col col-lg-8">
          <div className={classes.SignIn}>
            <Lottie 
              options={defaultOptions}
              height={400}
              width={540}/>
            <h4
              className="mt-3 squatText" 
              style={{display: 'block'}}>find the ones that push you to your limit</h4>
          </div>
        </div>
        {/* Right Side */}
        <div className="col col-lg-4" style={{marginTop: '80px'}}>
          <div className="card">
            <div className="card-body">
              <form 
                className="form-inline flex-column justify-content-center"
                onSubmit={(event) => this.onSubmitHandler(event)}>
                <p className="signUpText">Sign Up</p>
                {errorMsg}
                <div className="form-group justify-content-center">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="text" 
                    name="firstName" 
                    value={this.state.firstName}
                    className="form-control inputTop" 
                    placeholder="First name"/>
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="text" 
                    name="lastName" 
                    value={this.state.lastName}
                    className="form-control inputBot"
                    placeholder="Last name"/>
                </div>
                <div className="form-group">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="email" 
                    name="email" 
                    value={this.state.email}
                    className="form-control regInput" 
                    placeholder="Email address"/>
                </div>
                <div className="form-group">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="password" 
                    name="password" 
                    value={this.state.password}
                    className="form-control regInput"
                    placeholder="Password"/>
                </div>
                <button 
                  className="btn mt-2 px-4"
                  type= "submit"
                  >Continue</button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    doneSignUp: state.auth.doneSignUp,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp, info) => dispatch(actionCreators.auth(email, password, isSignUp, info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);