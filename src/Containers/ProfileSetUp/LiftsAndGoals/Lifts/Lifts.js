import React, {Component} from 'react';
import classes from './Lifts.module.css';
import Button from '../../../../Components/UI/Button/Button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../../../../store/actions/actionSetup';

class Lifts extends Component {
  state = {
    benchWeight: '',
    benchReps: '',
    benchSets: '',
    squatWeight: '',
    squatReps: '',
    squatSets: '',
    dlWeight: '',
    dlReps: '',
    dlSets: '',
    isSubmit: false
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    // Add rules for entering in info
    if ((this.state.benchWeight === '') ||
        (this.state.benchReps === '') ||
        (this.state.benchSets === '') ||
        (this.state.squatWeight === '') ||
        (this.state.squatReps === '') ||
        (this.state.squatSets === '') ||
        (this.state.dlWeight === '') ||
        (this.state.dlReps === '') ||
        (this.state.dlSets === '') ) {
          alert('Please fill out the whole form')
    }
    else {
      const lifts = [
        {bench: {
          weight: this.state.benchWeight,
          reps: this.state.benchReps,
          sets: this.state.benchSets}
        },
        {squat: {
          weight: this.state.squatWeight,
          reps: this.state.squatReps,
          sets: this.state.squatSets}
        },
        {deadlift: {
          weight: this.state.dlWeight,
          reps: this.state.dlReps,
          sets: this.state.dlSets}
        }
      ]
      this.setState({isSubmit: true});
      this.props.submitLiftsHandler(lifts);
    }
    
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render () {
    if (this.state.isSubmit) {
      console.log('is submit')
      return (<Redirect to="/goals"/>)
    }
    return (
      <div className="col">
        <form onSubmit={(event) => this.onSubmitHandler(event)}>
          <h2 className="text-center">enter your lifts</h2>
          <small className="form-text text-muted">this data will be used to match you with the right gym partner</small>
          <div className="row mb-3">
            <div className="col-12 col-lg-4 px-4">
              <div className="card my-3 p-2">
                <h5 
                  className="card-title mt-3">Bench Press</h5>
                <img 
                  className={classes.Icon}
                  src={require('../../../../Components/UI/Icons/bench.svg')} 
                  alt="icon" 
                  height="80" width="80"/>
                <div className="form-group mt-3">
                  <input
                    onChange={(event) => this.onChangeHandler(event)}
                    min="45" 
                    type="number" 
                    name="benchWeight" 
                    className={classes.Input} 
                    placeholder="weight"/>
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
 
                    type="number" 
                    name="benchReps" 
                    className={classes.Input}
                    placeholder="reps"/>
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => this.onChangeHandler(event)}  
                    type="number" 
                    name="benchSets" 
                    className={classes.Input}
                    placeholder="sets"/>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 px-4">
              <div className="card my-3 p-2">
                <h5 className="card-title mt-3">Squat</h5>
                <img 
                  className={classes.Icon}
                  src={require('../../../../Components/UI/Icons/squat.svg')} 
                  alt="icon" 
                  height="80" width="80"/>
                <div className="form-group mt-3">
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    min="45" 
                    type="number" 
                    name="squatWeight" 
                    className={classes.Input} 
                    placeholder="weight"/>
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    type="number" 
                    name="squatReps" 
                    className={classes.Input}
                    placeholder="reps"/>
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    type="number" 
                    name="squatSets" 
                    className={classes.Input}
                    placeholder="sets"/>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 px-4">
              <div className="card my-3 p-2">
                <h5 className="card-title mt-3">Deadlift</h5>
                <img 
                  className={classes.Icon}
                  src={require('../../../../Components/UI/Icons/deadlift.svg')} 
                  alt="icon" 
                  height="80" width="80"/>
                <div className="form-group mt-3">
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    min="45" 
                    type="number" 
                    name="dlWeight" 
                    className={classes.Input} 
                    placeholder="weight"/>
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => this.onChangeHandler(event)}  
                    type="number" 
                    name="dlReps" 
                    className={classes.Input}
                    placeholder="reps"/>
                </div>
                <div className="form-group">
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    type="number" 
                    name="dlSets" 
                    className={classes.Input}
                    placeholder="sets"/>
                </div>
              </div>
            </div>
          </div>
          <Button>Continue</Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitLiftsHandler: (lifts) => dispatch(actionCreators.submitLifts(lifts))
  }
}

export default connect(null, mapDispatchToProps)(Lifts);


