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
  state = {
    hasMessaged: false
  }
  componentDidMount = () => {
    console.log('profile page mounted')
    // fetch for messages if not available
    if (this.props.groupMsgs === undefined) {
      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('userId');
      this.props.onFetchMessages(token, userId);
    }
  }

  componentDidUpdate = () => {
    // check if user has already started a message with other user
    if (this.props.groupMsgs !== undefined && this.props.data !== null && !this.state.hasMessaged) {
      const groupArray = [this.props.data.userId, localStorage.getItem('userId')];
      this.props.groupMsgs.map(group => {
        if (
          // check if array is equal even if they are out of order
          (group.userIds[0] === groupArray[0] && group.userIds[1] === groupArray[1]) ||
          (group.userIds[1] === groupArray[0] && group.userIds[0] === groupArray[1])) {
          this.setState({hasMessaged: true})
        }
      })
    }
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
      profileRender = <Timeline history={this.props.history} ownData={this.props.ownData}/>
    }
    return (
      <div className="col">
        <Modal
          closeModal={this.hideModalHandler} 
          show={this.props.submitting}>
          <MessagesModal history={this.props.history} click={this.hideModalHandler}/>
        </Modal>
        <ProfileHeader 
          hasMessaged={this.state.hasMessaged}
          history={this.props.history} 
          click={this.showModalHandler} 
          ownData={this.props.ownData}/>
        <AboutToolbar history={this.props.history} />
        {profileRender}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.pumpr.data,
    ownData: state.pumpr.ownData,
    token: state.auth.token,
    userId: state.auth.userId,
    submitting: state.setup.submitting,
    groupMsgs: state.pumpr.groupMsgs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchNavProfile(token, userId)),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    openModalHandler: () => dispatch(actionModals.openModal()),
    onFetchReview: (token, userId) => dispatch(actionCreators.fetchReviews(token ,userId)),
    onFetchMessages: (token, userId) => dispatch(actionCreators.fetchMessages(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);