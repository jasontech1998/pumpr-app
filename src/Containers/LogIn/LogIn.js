import React, { Component } from 'react'
import '../SignUp/SignUp.css';
import * as actionCreators from '../../store/actions/actionAuth';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../Components/UI/Lottie/login.json';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    isSignUp: false
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.email.length === 0 || this.state.password === 0) {
      this.setState({
        missingInputs: true
      });
    }
    else {
      this.setState({
        missingInputs: false
      });
      this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp);
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
    // Log In error Handling
    if (this.props.error) {
      if (this.props.error.message === "EMAIL_NOT_FOUND") {
        errorMsg = <p className="errorMsg">We don't recognize this email address.</p>;
      }
      else if (this.props.error.message === "INVALID_PASSWORD") {
        errorMsg = <p className="errorMsg">Incorrect password.</p>;
      }
    };
    if (this.state.missingInputs) {
      errorMsg = <p className="errorMsg">Please fill out the entire form.</p>;
    };

    // Lottie Animation 
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    if (this.props.hasToken) {
      return (<Redirect to='/dashboard' />)
    }
    return (
      <>
        <div className="col-7 d-none d-lg-block mt-3">
          <Lottie 
            options={defaultOptions}
            height={440}
            width={500}/>
        </div>
        <div className="col-12 col-lg-5 d-flex align-items-center">
          <div className="card logInCard">
            <div className="card-body">
              <form 
                onSubmit={(event) => this.onSubmitHandler(event)}
                className="form-inline flex-column justify-content-center">
                <p style={{fontWeight: '600'}}>Log In</p>
                {errorMsg}
                <div className="form-group">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="email" 
                    name="email" 
                    className="form-control regInput" placeholder="Email address"/>
                </div>
                <div className="form-group">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="password" 
                    name="password" 
                    className="form-control regInput" placeholder="Password"/>
                </div>
                <button 
                  className="btn mt-2 px-4"
                  type="submit"
                  style={{fontSize: 'smaller'}}>Continue</button>
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
    hasToken: state.auth.doneSignUp,
    error: state.auth.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);