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
      // check if user has already started a message with other user
      if (this.props.groupMsgs !== undefined && this.props.data !== null && !this.state.hasMessaged && this.props.messages.length !== 0) {
        const groupArray = [this.props.data.userId, localStorage.getItem('userId')];
        this.props.groupMsgs.map(group => {
          if (
            // check if array is equal even if they are out of order
            (group.value.userIds[0] === groupArray[0] && group.value.userIds[1] === groupArray[1]) ||
            (group.value.userIds[1] === groupArray[0] && group.value.userIds[0] === groupArray[1])) {
            // save the groupMsg ID
            this.setState({hasMessaged: true});
            // Loop through messages and find the array of messages from both user's groupMsg
            this.props.messages.map(msgArray => {
              // Can just look at the first element and check to see if the groupId key matches
              if (msgArray[0].data.groupId === group.key) {
                // if so, this array of messages is corresponding to both user's groupMsg
                msgArray.map(msg => {
                  // Loop through array of messages and check if a message has an accepted offer
                  if (msg.data.offerAccepted) {
                    // if so, save the key of that message in state
                    this.setState({leaveReview: msg.key, reviewMsg: msgArray[0]});
                  }
                });
              };
            });
          }
        })
      }
      // reset state to false when viewing differnt user's profile
      else if (this.props.data.userId !== prevProps.data.userId) {
        this.setState({hasMessaged: false, leaveReview: false})
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
    if (this.props.history.location.pathname === '/profile-about') {
      profileRender = <About 
                        history={this.props.history} 
                        ownData={this.props.ownData} 
                        leaveReview={this.state.leaveReview}
                        reviewMsg={this.state.reviewMsg}/>;
      headerRender = <ProfileHeader
                        hasMessaged={this.state.hasMessaged}
                        history={this.props.history} 
                        click={this.showModalHandler} 
                        ownData={this.props.ownData}/>
    }
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