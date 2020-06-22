import React, { Component } from 'react'
import classes from './SignUp.module.css';
import './SignUp.css';
import Lottie from 'react-lottie';
import animationData from '../../Components/UI/Lottie/squat.json';
import * as actionCreators from '../../store/actions/actionAuth';
import { animateScroll as scroll } from 'react-scroll'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class SignIn extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isSignUp: true,
    fullName: ''
  }
  
  
  scrollToBottom = () => {
    scroll.scrollToBottom();
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.email.length === 0 || this.state.password === 0) {
      alert('Please fill out the entire form!')
    }
    else if(this.state.password.length < 6) {
      alert('Password must be atleast 6 characters in length')
    }
    const fullName = {firstName: this.state.firstName, lastName: this.state.lastName}
    // this.setState({fullName: fullName})
    this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp, fullName)
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    // Lottie Animation 
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    if (this.props.doneSignUp) {
      return <Redirect to="/lifts"/>
    }
    return (
      <React.Fragment>
        {/* <div id='push'></div> */}
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
            {/* <div className="card-header">Sign Up</div> */}
            <div className="card-body">
              <form 
                className="form-inline flex-column justify-content-center"
                onSubmit={(event) => this.onSubmitHandler(event)}>
                <p className="signUpText">Sign Up</p>
                <div className="form-group justify-content-center">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="text" 
                    name="firstName" 
                    value={this.state.firstName}
                    className="form-control inputTop" 
                    // id="signUpInput"
                    placeholder="First name"/>
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="text" 
                    name="lastName" 
                    value={this.state.lastName}
                    className="form-control inputBot"
                    // id="signUpInput"
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
        {/* In case I want to push the Chevron down */}
        {/* <div id='push'></div> */}
        {/* <div className="d-none d-md-block col-lg-12">
          <div className="mt-5">
            <i onClick={this.scrollToBottom}className="fas fa-chevron-down fa-2x"></i>
          </div>
        </div> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    doneSignUp: state.auth.doneSignUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp, fullName) => dispatch(actionCreators.auth(email, password, isSignUp, fullName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);