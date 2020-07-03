import React, {Component} from 'react';
import classes from './Lifts.module.css';
import Button from '../../../../Components/UI/Button/Button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../../../../store/actions/actionSetup';
import './lifts.css';
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
  };

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
          this.setState({missingInputs: true})
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
      ];
      this.setState({isSubmit: true, missingInputs: false});
      this.props.submitLiftsHandler(lifts);
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  render () {
    if (this.state.isSubmit) {
      console.log('is submit');
      return (<Redirect to="/goals"/>);
    };
    if (this.props.ownData) {
      return (<Redirect to="/dashboard" />)
    }

    // Error handling
    let errorMsg = null;
    if (this.state.missingInputs) {
      errorMsg = <p className="errorMsg">Please fill out the entire form.</p>;
    }
    
    return (
      <div className="col">
        <form onSubmit={(event) => this.onSubmitHandler(event)}>
          <h2 className="text-center">enter your lifts</h2>
          <small className="form-text text-muted">this data will be used to match you with the right gym partner</small>
          <small className="form-text text-muted">feel free to input your one rep max or your general lifts</small>
          <div className="row liftsWrapper">
            <div className="col-12 col-lg-4 px-4">
              <div className="liftsCard my-3 p-2">
                <h5 
                  className="card-title mt-3">Bench Press</h5>
                <img 
                  className={classes.Icon}
                  src={require('../../../../Components/UI/Icons/bench.svg')} 
                  alt="icon" 
                  height="80" width="80"/>
                <div className="form-group">
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
              <div className="liftsCard my-3 p-2">
                <h5 className="card-title mt-3">Squat</h5>
                <img 
                  className={classes.Icon}
                  src={require('../../../../Components/UI/Icons/squat.svg')} 
                  alt="icon" 
                  height="80" width="80"/>
                <div className="form-group">
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
              <div className="liftsCard my-3 p-2">
                <h5 className="card-title mt-3">Deadlift</h5>
                <img 
                  className={classes.Icon}
                  src={require('../../../../Components/UI/Icons/deadlift.svg')} 
                  alt="icon" 
                  height="80" width="80"/>
                <div className="form-group">
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
          {errorMsg}
          <Button>Continue</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitLiftsHandler: (lifts) => dispatch(actionCreators.submitLifts(lifts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lifts);


