import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import MessagesModal from '../Messages/MessagesModal/messagesModal';
import About from './About/about';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import AboutToolbar from '../../Components/Navigation/Toolbar/AboutToolbar';
import Timeline from './Timeline/Timeline';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';
import * as actionModals from '../../store/actions/actionSetup';

class ProfilePage extends Component {
  componentDidMount = () => {
    console.log('profile page mounted')
  }
  showModalHandler = () => {
    this.props.openModalHandler();
  }
  hideModalHandler = () => {
    this.props.closeModalHandler()
  }
  render () {
    let profileRender = null
    if (this.props.history.location.pathname === '/profile-about') {
      profileRender = <About history={this.props.history} ownData={this.props.ownData}/>
    }
    else if (this.props.history.location.pathname ==='/profile-timeline') {
      profileRender = <Timeline />
    }
    return (
      <div className="col">
        <Modal
          closeModal={this.hideModalHandler} 
          show={this.props.submitting}>
          <MessagesModal click={this.hideModalHandler}/>
        </Modal>
        <ProfileHeader 
          history={this.props.history} 
          click={this.showModalHandler} ownData={this.props.ownData}/>
        <AboutToolbar history={this.props.history} />
        {profileRender}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData,
    token: state.auth.token,
    userId: state.auth.userId,
    submitting: state.setup.submitting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchNavProfile(token, userId)),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    openModalHandler: () => dispatch(actionModals.openModal()),
    onFetchReview: (token, userId) => dispatch(actionCreators.fetchReviews(token ,userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);