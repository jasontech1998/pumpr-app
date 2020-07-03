import React, {Component} from 'react';
import './messagesModal.css';
import Button from '../../../Components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';
import * as actionModals from '../../../store/actions/actionSetup';
import ReviewList from '../../Reviews/SendReviews/reviewList';
class MessagesModal extends Component {
  state = {
    messageInput: '',
    selectedFeedback: [],
    feedbackMsg: ''
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  hideModalHandler = () => {
    this.props.closeModalHandler();
  }

  sendMsgHandler = () => {
    const userIds = [this.props.ownData.userId, this.props.data.userId];
    const groupMsgUsers = {
      userIds: userIds
    };
    // Store receiver's gym location
    const receiverGym = this.props.data.userSetup.profile.gym;
    // Store sender's gym location
    const senderGym = this.props.ownData.userSetup.profile.gym;
    // store receiver profile pic
    let receiverPic = this.props.data.userSetup.profile.profileURL;
    // store sender profile pic
    let senderPic = this.props.ownData.userSetup.profile.profileURL;
    // store date sent
    let month = new Date().toLocaleString('en-US', {month: 'short'});
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    const dateSent = `${month} ${day}, ${year}`;
    // store receiver's full name
    const {fullName} = this.props.data.userSetup;
    const receiverName = `${fullName.firstName} ${fullName.lastName}`;
    // store sender's full name
    const senderFullName = this.props.ownData.userSetup.fullName;
    const senderName = `${senderFullName.firstName} ${senderFullName.lastName}`;
    const content = this.state.messageInput;
    const token = localStorage.getItem('token');
    this.props.onPostGroupMsg(token, groupMsgUsers, content, dateSent, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym);
    this.props.history.push('/messages');
  }
  optionsHandler = (option) => {
    if (!this.state.selectedFeedback.includes(option)) {
      const copyArray = this.state.selectedFeedback.slice();
      copyArray.push(option);
      this.setState({selectedFeedback: copyArray});
    }
    else {
      const copyArr = this.state.selectedFeedback.slice();
      const index = copyArr.indexOf(option);
      copyArr.splice(index, 1);
      this.setState({selectedFeedback: copyArr});
    }
  }
  // User is sending feedback
  submitFeedbackHandler = () => {
    if (this.state.feedbackMsg !== '') {
      // store date sent
      let month = new Date().toLocaleString('en-US', {month: 'short'});
      let day = new Date().getDate();
      let year = new Date().getFullYear();
      const dateSent = `${month} ${day}, ${year}`;
      // store sender name and picture
      const {fullName} = this.props.ownData.userSetup;
      const senderName = `${fullName.firstName} ${fullName.lastName}`;
      const senderPic = this.props.ownData.userSetup.profile.profileURL;
      // store correct user Id
      let userId = this.props.modalData.senderUserId;
      if (userId === localStorage.getItem('userId')) {
        userId = this.props.modalData.receiverUserId;
      }
      const review = {
        options: this.state.selectedFeedback,
        msg: this.state.feedbackMsg,
        senderPic: senderPic,
        senderName: senderName,
        senderUserId: localStorage.getItem('userId'),
        date: dateSent
      };
      const feedbackObj = {
        userId: userId,
        review: review
      };
      const token = localStorage.getItem('token');
      this.setState({sendFeedbackError: false});
      // send review to database
      this.props.onPostFeedback(token, feedbackObj);
      this.props.closeModalHandler();
      // update groupMsg hasReviewed with userId
      // push userId into hasReviewed and remove first element if the placeholder is still there
      this.props.modalData.hasReviewed.push(localStorage.getItem('userId'));
      if (this.props.modalData.hasReviewed[0] === 0) {
        this.props.modalData.hasReviewed.shift();
      }
      const groupData = {
        userIds: this.props.modalData.groupUserIds,
        hasReviewed: this.props.modalData.hasReviewed
      }
      // send to firebase to update
      this.props.onUpdateHasReviewHandler(this.props.modalData.groupIdKey, token, groupData);
    }
    else {
      this.setState({sendFeedbackError: true});
    }
  }
  render() {
    // Error Handling
    let errorMsg = null;
    if (this.state.sendFeedbackError) {
      errorMsg = <p className="errorMsg">Please fill out the entire form.</p>;
    }
    // display feedback modal
    let name = null;
    if (this.props.modalData) {
      const userId = localStorage.getItem('userId');
      if (this.props.modalData.senderUserId === userId) {
        name = this.props.modalData.receiverName;
      }
      else {
        name = this.props.modalData.senderName;
      }
      return (
        <div style={{padding: '10px 10px'}}>
          <h3 className="sendTitle mb-3 ml-3">Leave Feedback</h3>
          {errorMsg}
          <div className="d-flex mt-3">
            <span>What did {name} do well?</span>
          </div>
          <ReviewList click={(option) => this.optionsHandler(option)}/>
          <div className="mt-3">
              <textarea
                onChange={(event) => this.onChangeHandler(event)}
                className="msgInput mb-3"
                name="feedbackMsg" 
                rows="5"
                placeholder="Leave a comment"/>
            </div>
            <button
              onClick={() => this.submitFeedbackHandler()} 
              className="offerBtn">Submit Feedback</button>
        </div>
      )
    }
    return (
      <div>
        <h3>Ask A Question</h3>
        <textarea
          onChange={(event) => this.onChangeHandler(event)}
          className="offerInput mb-3"
          value={this.state.messageInput}
          name="messageInput" 
          rows="5"
          placeholder="Say something..."/>
        <Button click={() => {this.sendMsgHandler(); this.props.click()}}>Send Message</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    modalData: state.setup.modalData,
    ownData: state.pumpr.ownData,
    data: state.pumpr.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostGroupMsg: (token, groupMsgUsers, content, date, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym) => dispatch(actionCreators.postGroupMsg(token, groupMsgUsers, content, date, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym)),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    onPostFeedback: (token, feedback) => dispatch(actionCreators.submitFeedback(token, feedback)),
    onUpdateHasReviewHandler:(key, token, groupData) => dispatch(actionCreators.updateHasReviewed(key, token, groupData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesModal);