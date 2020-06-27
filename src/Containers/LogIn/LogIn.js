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
      alert('Please fill out the entire form!')
    }
    else if(this.state.password.length < 6) {
      alert('Password must be atleast 6 characters in length')
    }
    this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp)
    
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
    if (this.props.hasToken) {
      return (<Redirect to='/profile-about' />)
    }
    return (
      <>
        <div className="col-7 mt-3">
          <Lottie 
            options={defaultOptions}
            height={440}
            width={500}/>
        </div>
        <div className="col-5 d-flex align-items-center">
          <div className="card logInCard">
            <div className="card-body">
              <form 
                onSubmit={(event) => this.onSubmitHandler(event)}
                className="form-inline flex-column justify-content-center">
                <p style={{fontWeight: '600'}}>Log In</p>
                <div className="form-group">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="email" 
                    name="email" 
                    className="form-control regInput mx-sm-3 mb-sm-2" placeholder="Email address"/>
                </div>
                <div className="form-group">
                  <input 
                    onChange={(event) => this.onChangeHandler(event)}
                    type="password" 
                    name="password" 
                    className="form-control regInput mx-sm-3 mb-sm-2" placeholder="Password"/>
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
    hasToken: state.auth.doneSignUp
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);