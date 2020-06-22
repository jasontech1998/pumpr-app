import React, {Component} from 'react';
import classes from '../../ProfileSetUp/LiftsAndGoals/Lifts/Lifts.module.css';

class GymInfo extends Component {
  state = {
    benchWeight: this.props.lifts[0].bench.weight,
    benchReps: this.props.lifts[0].bench.reps,
    benchSets: this.props.lifts[0].bench.sets,
    squatWeight: this.props.lifts[1].squat.weight,
    squatReps: this.props.lifts[1].squat.reps,
    squatSets: this.props.lifts[1].squat.sets,
    dlWeight: this.props.lifts[2].deadlift.weight,
    dlReps: this.props.lifts[2].deadlift.reps,
    dlSets: this.props.lifts[2].deadlift.sets
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render () {
 
    return (
      <>
        <h3>Your Lifts</h3>
        <div className="col">
          <form onSubmit={(event) => this.onSubmitHandler(event)}>
            <div className="row mb-3">
              <div className="col-12 col-lg-4 px-4">
                <div className="card my-3 p-2">
                  <h5 
                    className="card-title mt-3">Bench Press</h5>
                  <img 
                    className={classes.Icon}
                    src={require('../../../Components/UI/Icons/bench.svg')} 
                    alt="icon" 
                    height="80" width="80"/>
                  <div className="form-group mt-3">
                    <input
                      onChange={(event) => this.onChangeHandler(event)}
                      min="45" 
                      type="number" 
                      name="benchWeight" 
                      className={classes.Input} 
                      value={this.state.benchWeight}/>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={(event) => this.onChangeHandler(event)} 
                      type="number" 
                      name="benchReps" 
                      className={classes.Input}
                      value={this.state.benchReps}/>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={(event) => this.onChangeHandler(event)}  
                      type="number" 
                      name="benchSets" 
                      className={classes.Input}
                      value={this.state.benchSets}/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 px-4">
                <div className="card my-3 p-2">
                  <h5 className="card-title mt-3">Squat</h5>
                  <img 
                    className={classes.Icon}
                    src={require('../../../Components/UI/Icons/squat.svg')} 
                    alt="icon" 
                    height="80" width="80"/>
                  <div className="form-group mt-3">
                    <input
                      onChange={(event) => this.onChangeHandler(event)} 
                      min="45" 
                      type="number" 
                      name="squatWeight" 
                      className={classes.Input} 
                      value={this.state.squatWeight}/>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={(event) => this.onChangeHandler(event)} 
                      type="number" 
                      name="squatReps" 
                      className={classes.Input}
                      value={this.state.squatReps}/>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={(event) => this.onChangeHandler(event)} 
                      type="number" 
                      name="squatSets" 
                      className={classes.Input}
                      value={this.state.squatSets}/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 px-4">
                <div className="card my-3 p-2">
                  <h5 className="card-title mt-3">Deadlift</h5>
                  <img 
                    className={classes.Icon}
                    src={require('../../../Components/UI/Icons/deadlift.svg')} 
                    alt="icon" 
                    height="80" width="80"/>
                  <div className="form-group mt-3">
                    <input
                      onChange={(event) => this.onChangeHandler(event)} 
                      min="45" 
                      type="number" 
                      name="dlWeight" 
                      className={classes.Input} 
                      value={this.state.dlWeight}/>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={(event) => this.onChangeHandler(event)}  
                      type="number" 
                      name="dlReps" 
                      className={classes.Input}
                      value={this.state.dlReps}/>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={(event) => this.onChangeHandler(event)} 
                      type="number" 
                      name="dlSets" 
                      className={classes.Input}
                      value={this.state.dlSets}/>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={this.onSaveHandler} 
              className="offerBtn">Save</button>
          </form>
        </div>
      </>
    )
  }
}


export default GymInfo;