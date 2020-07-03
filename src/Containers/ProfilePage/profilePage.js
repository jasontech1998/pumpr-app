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

  componentDidUpdate = (prevProps, nextProps) => {
    if (prevProps.data.userId !== undefined || this.props.data.userId !== undefined && this.props.messages.length !== 0) {
      if (this.props.groupMsgs !== undefined && this.props.data !== null && !this.state.hasMessaged && this.props.messages.length !== 0) {
        // check if user has already started a message with other user
        const groupArray = [this.props.data.userId, localStorage.getItem('userId')];
        this.props.groupMsgs.map(group => {
          if (
            // check if array of userIds is equal even if they are out of order
            (group.value.userIds[0] === groupArray[0] && group.value.userIds[1] === groupArray[1]) ||
            (group.value.userIds[1] === groupArray[0] && group.value.userIds[0] === groupArray[1])) {
            // if found, update state to show that they have messaged each other already
            this.setState({hasMessaged: true});
            // check if they can review each other
            if (group.value.hasReviewed) {
              // if userId not included in hasReviewed, then the user can leave a review
              if (group.value.hasReviewed.includes(localStorage.getItem('userId'))) {
                console.log('has reviewed already')
              }
              // save review data in state to be passed down to about component
              else {
                this.setState({
                  hasReviewed: group.value.hasReviewed,
                  groupIdKey: group.key, 
                  groupUserIds: group.value.userIds
                })
              }
            }
          }
        })
      }
      // reset state to false when viewing differnt user's profile
      else if (this.props.data.userId !== prevProps.data.userId) {
        this.setState({hasMessaged: false, groupIdKey: false})
      }
      // these conditions work only when user clicks on the navbar to view their own profile while on another user's profile page
      else if (this.props.data.userId === prevProps.data.userId) {
        if (nextProps.hasMessaged === this.state.hasMessaged && !this.state.clickNav) {
          this.setState({clickNav: true})
        }
      }
    }
  }

  showModalHandler = () => {
    this.props.openModalHandler();
  }

  hideModalHandler = () => {
    this.props.closeModalHandler();
  }

  render () {
    const userId = localStorage.getItem('userId');
    let profileRender = null;
    let headerRender = null;
    // When user navigates to about
    if (this.props.history.location.pathname === '/profile-about') {
      profileRender = <About 
                        history={this.props.history} 
                        ownData={this.props.ownData} 
                        hasReviewed={this.state.hasReviewed}
                        groupIdKey={this.state.groupIdKey}
                        groupUserIds={this.state.groupUserIds}/>;
      headerRender = <ProfileHeader
                        hasMessaged={this.state.hasMessaged}
                        history={this.props.history} 
                        click={this.showModalHandler} 
                        ownData={this.props.ownData}/>
    }
    // When user navigates to timeline
    else if (this.props.history.location.pathname ==='/profile-timeline') {
      profileRender = <Timeline history={this.props.history} ownData={this.props.ownData}/>;
      headerRender = <ProfileHeader
                        hasMessaged={this.state.hasMessaged}
                        history={this.props.history} 
                        click={this.showModalHandler} 
                        ownData={this.props.ownData}/>
    }
    // This instance is for when the user uses navbar to view own profile while on another user's profile
    if (this.props.history.location.pathname === '/profile-about' && this.props.history.location.userId === userId) {
      // pass clickNav prop so I know that user clicked from navbar
      profileRender = <About 
                        history={this.props.history} 
                        ownData={this.props.ownData} 
                        clickNav={true}/>;
      headerRender = <ProfileHeader
                        clickNav={true}
                        hasMessaged={this.state.hasMessaged}
                        history={this.props.history} 
                        click={this.showModalHandler} 
                        ownData={this.props.ownData}/>
    }
    return (
      <div className="col">
        <Modal
          closeModal={this.hideModalHandler} 
          show={this.props.submitting}>
          <MessagesModal history={this.props.history} click={this.hideModalHandler}/>
        </Modal>
        {headerRender}
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
    groupMsgs: state.pumpr.groupMsgs,
    messages: state.pumpr.messages
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