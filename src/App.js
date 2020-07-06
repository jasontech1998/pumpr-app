import React, {Component} from 'react';
import './App.css';
import * as actionCreators from './store/actions/actionAuth';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './Components/Layout/Layout';
import Help from './Components/Help/Help';
import SignUp from './Containers/SignUp/SignUp';
import Footer from './Components/Footer/Footer';
import LogIn from './Containers/LogIn/LogIn';
import Lifts from './Containers/ProfileSetUp/LiftsAndGoals/Lifts/Lifts';
import Goals from './Containers/ProfileSetUp/LiftsAndGoals/Goals';
import PicAndBio from './Containers/ProfileSetUp/ProfilePicAndBio/PicAndBio';
import GymSchedule from './Containers/ProfileSetUp/GymSchedule/GymSchedule';
import Location from './Containers/ProfileSetUp/Location/Location';
import Logout from './Containers/LogOut/Logout';
import ProfilePage from './Containers/ProfilePage/profilePage';
import FindAPartner from './Containers/FindAPartner/findAPartner';
import Dashboard from './Containers/Dashboard/Dashboard';
import Messages from './Containers/Messages/Messages';
import Settings from './Containers/Settings/Settings';


class App extends Component {

  componentDidMount () {
    this.props.onAutoSignUp();
  }

  render () {
    // User is not logged in
    let routes = (
        <Switch>
          {/* Auth */}
          <Route path="/" exact component={SignUp}/>
          <Route path="/help" exact component={Help} />
          <Route path="/log-in" exact component={LogIn} />
          <Redirect to="/" />
        </Switch>
    );
    // User is logged in
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={SignUp}/>
          <Route path="/log-out" exact component={Logout} />
          
          {/* User Profile*/}
          <Route path="/profile-about" exact component={ProfilePage} />
          <Route path="/profile-timeline" exact component={ProfilePage} />
          <Route path="/profile-settings" exact component={Settings} />
          {/* Pumpr */}
          <Route path="/find-a-partner" exact component={FindAPartner} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/messages" exact component={Messages} />
          {/* Routes for onboarding process */}
          <Route path="/lifts" exact component={Lifts}/>
          <Route path="/goals" exact component={Goals} />
          <Route path="/profile-bio-setup" exact component={PicAndBio} />
          <Route path="/profile-location" exact component={Location} />
          <Route path="/gym-schedule" exact component={GymSchedule} />
          <Redirect to="/dashboard" />
        </Switch>  
      )
    };
    
    return (
      <>
        <div className="App">
          <Layout history={this.props.history}>
            {routes}
          </Layout>
          <Footer />
        </div>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
