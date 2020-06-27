import React, {Component} from 'react';
import classes from './about.module.css';
import './about.css';
import Reviews from '../../Reviews/ShowReviews/Reviews';
import Aux from '../../../hoc/Aux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';

class About extends Component {

  componentDidMount() {
    // Remove posts if in state
    if (this.props.posts) {
      console.log('there are posts')
      this.props.removePostsHandler();
    }
    // if user just created account, fetch own profile data
    if (this.props.data == "" && this.props.ownData === undefined) {
      console.log('user just created account')
      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      this.props.onFetchOwnProfile(token, userId);
    }
    // if location.state, clicked from find a partner to display other user's profile
    if (this.props.history.location.state) {
      console.log('View other user profile and update data prop')
      let userId = this.props.history.location.state
      let token = localStorage.getItem('token')
      this.props.onFetchProfile(token, userId);
      this.props.onFetchReviews(token, userId);
    }
    // fetch current user's reviews
    if (this.props.history.location.state === undefined) {
      // remove prop.data from state
      if (this.props.data) {
        console.log('remove data')
        this.props.removeDataPropHandler();
      }
      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      this.props.onFetchReviews(token, userId);
    }
    else if (this.props.history.location.state === null && this.props.data === "") {
      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      this.props.onFetchReviews(token, userId);
    }
  }  

  render () {
    // Initialize number of reviews
    let reviewLength = 0;
    let numReviews = null;
    if (this.props.reviews) {
      reviewLength = this.props.reviews.length;
    }
    if (reviewLength > 1) {
      numReviews = `${reviewLength} Reviews`;
    }
    else {
      numReviews = `${reviewLength} Review`;
    }
    // Initialize variables as null first
    let showGoals = null;
    let location = null;
    let bio = null;
    let benchWeight = null;
    let benchReps = null;
    let benchSets = null;
    let squatWeight = null;
    let squatReps = null;
    let squatSets = null;
    let deadWeight = null;
    let deadReps = null;
    let deadSets = null;

    // if location.state is undefined, display current user's data 
    if (this.props.history.location.state === undefined) {
      
      console.log('user just logged in or clicked on own user profile')
      
      if (this.props.ownData) {
        // Object destructuring
        const {lifts} = this.props.ownData.userSetup
        const {goals} = this.props.ownData.userSetup
        const {profile} = this.props.ownData.userSetup
        const {bench} = lifts[0]
        const {squat} = lifts[1]
        const {deadlift} = lifts[2]
        if (goals.goals[0] === "") {
          showGoals = <div>No Goals Selected</div>
        }
        // Dynamically render goals
        else {
          showGoals = (
            <Aux>
              {goals.goals.map((goal, index) => {
                return (
                  <div key={index} className="d-flex col-12 col-md-6 col-lg-3 mb-3">
                    <div className="cardProfile card-body flex-fill">{goal}
                    </div>
                  </div>
                )
              })}
            </Aux>
          )
        }
        // Insert data into initialized variables
        benchWeight = `${bench.weight} lbs`;
        benchReps = `${bench.reps} reps`;
        benchSets = `${bench.sets} sets`;
        squatWeight = `${squat.weight} lbs`;
        squatReps = `${squat.reps} reps`;
        squatSets = `${squat.sets} sets`;
        deadWeight = `${deadlift.weight} lbs`;
        deadReps = `${deadlift.reps} reps`;
        deadSets = `${deadlift.sets} sets`;
        bio = profile.profileBio;
        location = profile.location;
        if (profile.location === "") {
          location = 'Missing Location';
        }
      }
    }
    // If there is location.state, the user is viewing other user's profile
    else if (this.props.history.location.state) {
      console.log('user clicked on another user profile')
      // Check if data has been fetched from firebase
      if (this.props.data) {
        // Object destructuring
        const {lifts} = this.props.data.userSetup
        const {goals} = this.props.data.userSetup
        const {profile} = this.props.data.userSetup
        const {bench} = lifts[0]
        const {squat} = lifts[1]
        const {deadlift} = lifts[2] 
        // Dynamically render goals
        showGoals = (
          <Aux>
            {goals.goals.map((goal, index) => {
              return (
                <div key={index} className="d-flex col-12 col-md-6 col-lg-3 mb-3">
                  <div className="cardProfile card-body flex-fill">{goal}
                  </div>
                </div>
              )
            })}
          </Aux>
        )
        // Insert data into initialized variables
        benchWeight = `${bench.weight} lbs`;
        benchReps = `${bench.reps} reps`;
        benchSets = `${bench.sets} sets`;
        squatWeight = `${squat.weight} lbs`;
        squatReps = `${squat.reps} reps`;
        squatSets = `${squat.sets} sets`;
        deadWeight = `${deadlift.weight} lbs`;
        deadReps = `${deadlift.reps} reps`;
        deadSets = `${deadlift.sets} sets`;
 
        bio = profile.profileBio
        location = profile.location
        if (profile.location === "") {
          location = 'Missing Location';
        }
      }
    }
    // if state is null, user clicked from timeline to about or refreshed page
    else if (this.props.history.location.state === null) {
      // if no data prop, display current user
      if (this.props.data === '') {
        if (this.props.ownData) {
          // Object destructuring
          const {lifts} = this.props.ownData.userSetup
          const {goals} = this.props.ownData.userSetup
          const {profile} = this.props.ownData.userSetup
          const {bench} = lifts[0]
          const {squat} = lifts[1]
          const {deadlift} = lifts[2]
          // Dynamically render goals
        showGoals = (
          <Aux>
            {goals.goals.map((goal, index) => {
              return (
                <div key={index} className="d-flex col-12 col-md-6 col-lg-3 mb-3">
                  <div className="cardProfile card-body flex-fill">{goal}
                  </div>
                </div>
              )
            })}
          </Aux>
        )
          // Insert data into initialized variables
          benchWeight = `${bench.weight} lbs`;
          benchReps = `${bench.reps} reps`;
          benchSets = `${bench.sets} sets`;
          squatWeight = `${squat.weight} lbs`;
          squatReps = `${squat.reps} reps`;
          squatSets = `${squat.sets} sets`;
          deadWeight = `${deadlift.weight} lbs`;
          deadReps = `${deadlift.reps} reps`;
          deadSets = `${deadlift.sets} sets`;
      
          bio = profile.profileBio
          location = profile.location
          if (profile.location === "") {
            location = 'Missing Location';
          }
        }
      }
      // if data prop, display other user
      else if (this.props.data) {
        if (this.props.data) {
          // Object destructuring
          const {lifts} = this.props.data.userSetup
          const {goals} = this.props.data.userSetup
          const {profile} = this.props.data.userSetup
          const {bench} = lifts[0]
          const {squat} = lifts[1]
          const {deadlift} = lifts[2] 
          // Dynamically render goals
        showGoals = (
          <Aux>
            {goals.goals.map((goal, index) => {
              return (
                <div key={index} className="d-flex col-12 col-md-6 col-lg-3 mb-3">
                  <div className="cardProfile card-body flex-fill">{goal}
                  </div>
                </div>
              )
            })}
          </Aux>
        )
          // Insert data into initialized variables
          benchWeight = `${bench.weight} lbs`;
          benchReps = `${bench.reps} reps`;
          benchSets = `${bench.sets} sets`;
          squatWeight = `${squat.weight} lbs`;
          squatReps = `${squat.reps} reps`;
          squatSets = `${squat.sets} sets`;
          deadWeight = `${deadlift.weight} lbs`;
          deadReps = `${deadlift.reps} reps`;
          deadSets = `${deadlift.sets} sets`;
   
          bio = profile.profileBio
          location = profile.location
          if (profile.location === "") {
            location = 'Missing Location';
          }
        }
      }
    }
    
    return (
      <div className="row about">
        <div className="col">
          {/* User Join Date and Location */}
          <div className={classes.joinLocation}>
            <span className="mr-auto">Joined in 2020</span>
            <span>{location}</span>
          </div>
          {/* User Bio */}
          <p className="my-3">{bio}</p>
          {/* User Goals */}
          <div className="row">
            {showGoals}
          </div>
          {/* End of User Goals */}
          {/* User Lifts */}
          <h4 className="my-3">Current Lifts</h4>
          <div className="row">
            <div className="col-4 d-flex flex-column align-items-center">
              <img 
                  className={classes.Icon}
                  src={require('../../../Components/UI/Icons/bench.svg')} 
                  alt="icon" 
                  height="75" width="75"/>
              <span className="my-2 profileLifts">bench press</span>
              <span className="mb-2">{benchWeight}</span>
              <span className="mb-2">{benchReps}</span>
              <span className="mb-2">{benchSets}</span>
            </div>
            <div className="col-4 d-flex flex-column align-items-center">
              <img 
                  className={classes.Icon}
                  src={require('../../../Components/UI/Icons/squat.svg')} 
                  alt="icon" 
                  height="75" width="75"/>
              <span className="my-2 profileLifts">squat</span>
              <span className="mb-2">{squatWeight}</span>
              <span className="mb-2">{squatReps}</span>
              <span className="mb-2">{squatSets}</span>
            </div>
            <div className="col-4 d-flex flex-column align-items-center">
              <img 
                  className={classes.Icon}
                  src={require('../../../Components/UI/Icons/deadlift.svg')} 
                  alt="icon" 
                  height="75" width="75"/>
              <span className="my-2 profileLifts">deadlift</span>
              <span className="mb-2">{deadWeight}</span>
              <span className="mb-2">{deadReps}</span>
              <span className="mb-2">{deadSets}</span>
            </div>
          </div>
          {/* End of User Lifts */}
          {/* User Reviews */}
          <div className={classes.reviews}>
            <div className="review_Wrapper d-flex align-items-baseline justify-content-between">
              <h4 className="my-3">Reviews</h4>
              <span className="my-3">{numReviews}</span>
            </div>
            <div className="row">
              <Reviews reviews={this.props.reviews} history={this.props.history}/>
            </div>
          </div>
          {/* User Reviews End */}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    data: state.pumpr.data,
    token: state.auth.token,
    userId: state.auth.userId,
    reviews: state.pumpr.reviewsArray,
    posts: state.pumpr.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId)),
    onFetchOwnProfile: (token, userId) => dispatch(actionCreators.fetchNavProfile(token, userId)),
    onFetchReviews: (token, userId) => dispatch(actionCreators.fetchReviews(token, userId)),
    removeDataPropHandler: () => dispatch(actionCreators.removeData()),
    removePostsHandler: () => dispatch(actionCreators.removePosts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(About);