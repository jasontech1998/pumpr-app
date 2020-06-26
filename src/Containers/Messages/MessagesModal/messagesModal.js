import React, {Component} from 'react';
import './messagesModal.css';
import Button from '../../../Components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';

class MessagesModal extends Component {
  state = {
    messageInput: ''
  }

  onChangeHandler = (e) => {
    this.setState({messageInput: e.target.value})
  }

  sendMsgHandler = () => {
    const userIds = [this.props.ownData.userId, this.props.data.userId]
    const groupMsgUsers = {
      userIds: userIds
    }
    // Store receiver's gym location
    const receiverGym = this.props.data.userSetup.profile.gym
    // Store sender's gym location
    const senderGym = this.props.ownData.userSetup.profile.gym
    // store receiver profile pic
    let receiverPic = this.props.data.userSetup.profile.profileURL
    // store sender profile pic
    let senderPic = this.props.ownData.userSetup.profile.profileURL
    // store date sent
    let month = new Date().toLocaleString('en-US', {month: 'short'})
    let day = new Date().getDate()
    let year = new Date().getFullYear()
    const dateSent = `${month} ${day}, ${year}`
    // store receiver's full name
    const {fullName} = this.props.data.userSetup
    const receiverName = `${fullName.firstName} ${fullName.lastName}`
    // store sender's full name
    const senderFullName = this.props.ownData.userSetup.fullName
    const senderName = `${senderFullName.firstName} ${senderFullName.lastName}`
    const content = this.state.messageInput;
    const token = localStorage.getItem('token')
    this.props.onPostGroupMsg(token, groupMsgUsers, content, dateSent, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym);
    this.props.history.push('/messages');
  }
  render() {
    return (
      <div>
        <h3>Ask A Question</h3>
        <textarea
          onChange={(event) => this.onChangeHandler(event)}
          className="offerInput mb-3"
          value={this.state.messageInput}
          name="message" 
          rows="5"
          placeholder="Say something..."/>
        <Button click={() => {this.sendMsgHandler(); this.props.click()}}>Send Message</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData,
    data: state.pumpr.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostGroupMsg: (token, groupMsgUsers, content, date, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym) => dispatch(actionCreators.postGroupMsg(token, groupMsgUsers, content, date, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesModal);