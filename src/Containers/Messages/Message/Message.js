import React, {Component} from 'react';
import './Message.css';
import {connect} from 'react-redux';
import * as actionModals from '../../../store/actions/actionSetup';
import * as actionCreators from '../../../store/actions/actionPumpr';
import Aux from '../../../hoc/Aux';

class Message extends Component {
  state = {
    expand: false,
    messageInput: ''
  }
  onOfferHandler = (response , data) => {
    console.log(data.key);
    const id = data.key;
    const token = localStorage.getItem('token');
    let offerResponse = null;
    // if accept offer
    if (response === 'accept') {
      offerResponse = {offerAccepted: true};
      this.props.onOfferMsgHandler(id, token, offerResponse);
    }
    // else declined offer
    else {
      offerResponse = {offerAccepted: false};
      this.props.onOfferMsgHandler(id, token, offerResponse);
    }
  }

  onInputHandler = (event) => {
    this.setState({
      messageInput: event.target.value
    });
  }

  onSendMessageHandler = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // store date sent
    let month = new Date().toLocaleString('en-US', {month: 'short'});
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    const dateSent = `${month} ${day}, ${year}`;
    // format message object
    const sendMsgData = {
      content: this.state.messageInput,
      date: dateSent,
      senderUserId: userId
    };
    const sendMsg = {
      groupId: this.props.msgData[0].data.groupId,
      msgData: sendMsgData
    };
    this.setState({messageInput: ''});
    this.props.sendReplyHandler(token, sendMsg);
  }

  expandHandler = () => {
    console.log('expand');
    this.setState({expand: !this.state.expand});
  }

  sendOfferHandler = () => {
    const {msgData} = this.props.msgData[0].data;
    const modalData = {
      groupId: this.props.msgData[0].data.groupId,
      receiverName: msgData.receiverName,
      receiverGym: msgData.receiverGym,
      senderGym: msgData.senderGym
    }
    this.props.openModalHandler(modalData);
  }

  sendFeedbackHandler = () => {
    const {msgData} = this.props.msgData[0].data;
    const feedbackData = {
      receiverName: msgData.receiverName,
      receiverUserId: msgData.receiverUserId,
      senderName: msgData.senderName,
      senderPic: msgData.senderPic,
      senderUserId: msgData.senderUserId
    }
    this.props.openModalHandler(feedbackData);
  }

  render () {
    // Beginning of unexpanded messages
    let message = null;
    let allMessages = null;
    let workoutResponse = null;
    let responseStyle = null;
    // multiple message
    if (this.props.msgData.length >= 2) {
      // The first message should be a normal message if fetched in order
      // Look at first message sent and store picture, name, date
      this.props.msgData.map(msg => {
        if (msg.data.offerAccepted) {
          workoutResponse = 'Confirmed';
          responseStyle = 'confirm';
        }
        else if (msg.data.offerAccepted === false) {
          workoutResponse = 'Declined';
          responseStyle = 'decline';
        }
      })
      const {msgData} = this.props.msgData[0].data;
      const userId = localStorage.getItem('userId');
      let date = null;
      let content = '';
      let picture = msgData.senderPic;
      let name = msgData.senderName;
      if (msgData.senderUserId === userId) {
        if (!msgData.receiverPic) {
          picture = `/static/media/social.15eeae14.svg`;
        }
        else {
          picture = msgData.receiverPic;
        }
        name = msgData.receiverName;
      }
      // store the last message sent
      const lastMsg = this.props.msgData[this.props.msgData.length - 1]
      // if last message is an offer
      if (lastMsg.data.msgOfferData) {
        const {msgOfferData} = lastMsg.data
        date = msgOfferData.date
        if (msgOfferData.message) {
          content = `Lets workout on ${msgOfferData.monthInput} ${msgOfferData.dayInput} at ${msgOfferData.timeInput}. Location: ${msgOfferData.selectedLocation} Message: ${msgOfferData.message}`
        }
        else {
          content = `Lets workout on ${msgOfferData.monthInput} ${msgOfferData.dayInput} at ${msgOfferData.timeInput}. Location: ${msgOfferData.selectedLocation}`
        }
      }
      // else last message is a normal message
      else if (lastMsg.data.msgData){
        // store last message's content and date
        const {msgData} = lastMsg.data
        content = msgData.content
        date = msgData.date
      }
      message = (
        <div 
          className="row align-items-center messageCard" 
          onClick={this.expandHandler}>
          <div className="col-2">
          <img 
            className='ml-3 my-3 rounded-circle'
            src={picture}
            alt="icon" 
            height="80" width="80"/>
          </div>
          <div className="col-2 d-flex flex-column align-items-baseline">
            <span>{name}</span>
            <span>{date}</span>
          </div>
          <div className="col-5 d-flex">
            <span style={{textAlign: 'initial'}}>{content}</span>
          </div>
          <div className="col-3 d-flex">
            <span className={responseStyle}>{workoutResponse}</span>
          </div>
        </div>
      )
    }
    // single message
    else {
      const {msgData} = this.props.msgData[0].data
      const userId = localStorage.getItem('userId')
      let picture = msgData.senderPic
      let name = msgData.senderName
      // Change to receiver picture
      if (msgData.senderUserId === userId) {
        // if no picture, use icon
        if (!msgData.receiverPic) {
          picture = `/static/media/social.15eeae14.svg`
        }
        else {
          picture = msgData.receiverPic
        }
        name = msgData.receiverName
      }
      message = (
        <div 
          className="row align-items-center messageCard" 
          onClick={this.expandHandler}>
          <div className="col-2">
          <img 
            className='ml-3 my-3 rounded-circle'
            src={picture}
            alt="icon" 
            height="80" width="80"/>
          </div>
          <div className="col-2 d-flex flex-column align-items-baseline">
            <span>{name}</span>
            <span>{msgData.date}</span>
          </div>
          <div className="col-5 d-flex">
            <span>{msgData.content}</span>
          </div>
          <div className="col-3 d-flex">
          </div>
        </div>
      )
    }
    // End of unexpanded messages
    // Begin of expanded messages
    if (this.state.expand) {
      // initialize picture and name
      const {msgData} = this.props.msgData[0].data
      const lastMsg = this.props.msgData[this.props.msgData.length - 1]
      let date = null;
      // initialize date of last message
      if (lastMsg.data.msgData) {
        date = lastMsg.data.msgData.date
      }
      else if (lastMsg.data.msgOfferData) {
        date = lastMsg.data.msgOfferData.date
      }
      const userId = localStorage.getItem('userId')
      let picture = msgData.senderPic
      let name = msgData.senderName
      if (msgData.senderUserId === userId) {
        // if no picture, use icon
        if (!msgData.receiverPic) {
          picture = `/static/media/social.15eeae14.svg`
        }
        else {
          picture = msgData.receiverPic
        }
        name = msgData.receiverName
      }
      // dynamically generate messages
      allMessages = (
        <Aux>
          {this.props.msgData.map((msg, index) => {
            const {msgData} = msg.data
            const userId = localStorage.getItem('userId')
            // if normal message
            if (msgData) {
              // if sent from other user
              if (msgData.senderUserId !== userId) {
                return (
                  <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6 mt-3 d-flex">
                      <span className="msg">{msg.data.msgData.content}</span>
                    </div>
                    <div className="col-6"></div>
                  </div>
                )
              }
              // sent from same user
              else if (msgData.senderUserId === userId) {
                return (
                  <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6"></div>
                    <div className="col-6 mt-3 d-flex justify-content-end">
                      <span className="msg">{msgData.content}</span>
                    </div>
                  </div>
                )
              }
            }
            // if offer message
            else if (msg.data.msgOfferData) {
              const {msgOfferData} = msg.data
              console.log(msg)
              let offerMsg = null
              // if other user sent offer
              if (msg.data.senderUserId !== userId) {
                if (msgOfferData.message) {
                  offerMsg = `Offer Received: Lets workout on ${msgOfferData.monthInput} ${msgOfferData.dayInput} at ${msgOfferData.timeInput}. Location: ${msgOfferData.selectedLocation} Message: ${msgOfferData.message}`
                }
                else {
                  offerMsg = `Offer Received: Lets workout on ${msgOfferData.monthInput} ${msgOfferData.dayInput} at ${msgOfferData.timeInput}. Location: ${msgOfferData.selectedLocation}`
                }
                // if workout offer is accepted
                if (msg.data.offerAccepted) {
                  return (
                    <div
                      key={msg.data.groupId + index} 
                      className="d-flex">
                      <div className="col-6 mt-3 d-flex">
                        <div className="msg d-flex flex-column">
                          <span>{offerMsg}</span>
                          <div className="row justify-content-center mt-2">
                            <button className="accepted mr-3">Offer Accepted
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>
                  )
                }
                // if workout offer is not accepted
                else if (msg.data.offerAccepted === false) {
                  return (
                    <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6 mt-3 d-flex">
                      <div className="msg d-flex flex-column">
                        <span>{offerMsg}</span>
                        <div className="row justify-content-center mt-2">
                          <button className="declined mr-3">Offer Declined
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-6"></div>
                  </div>
                  )
                }
                return (
                  <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6 mt-3 d-flex">
                      <div className="msg d-flex flex-column">
                        <span>{offerMsg}</span>
                        <div className="row justify-content-center mt-2">
                          <button 
                            onClick={() => this.onOfferHandler('accept', msg)}
                            className="acceptOffer mr-3">Accept
                          </button>
                          <button 
                            onClick={() => this.onOfferHandler('decline', msg)}
                            className="declineOffer">Decline
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-6"></div>
                  </div>
                )
              }
              // if current user sent offer
              else if (msg.data.senderUserId === userId) {
                if (msgOfferData.message) {
                  offerMsg = `Offer Sent: Lets workout on ${msgOfferData.monthInput} ${msgOfferData.dayInput} at ${msgOfferData.timeInput}. Location: ${msgOfferData.selectedLocation} Message: ${msgOfferData.message}`
                }
                else {
                  offerMsg = `Offer Sent: Lets workout on ${msgOfferData.monthInput} ${msgOfferData.dayInput} at ${msgOfferData.timeInput}. Location: ${msgOfferData.selectedLocation}`
                }
                // if workout offer is accepted
                if (msg.data.offerAccepted) {
                  return (
                    <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6"></div>
                    <div className="col-6 mt-3 d-flex justify-content-end">
                      <div className="msg d-flex flex-column">
                        <span>{offerMsg}</span>
                        <div className="row justify-content-center mt-2">
                          <div className="row justify-content-center mt-2">
                            <button className="accepted mr-3">Offer Accepted
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }
                // if workout offer is not accepted
                else if (msg.data.offerAccepted === false) {
                  return (
                    <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6"></div>
                    <div className="col-6 mt-3 d-flex justify-content-end">
                    <div className="msg d-flex flex-column">
                        <span>{offerMsg}</span>
                        <div className="row justify-content-center mt-2">
                          <div className="row justify-content-center mt-2">
                            <button className="declined mr-3">Offer Declined
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }
                return (
                  <div
                    key={msg.data.groupId + index} 
                    className="d-flex">
                    <div className="col-6"></div>
                    <div className="col-6 mt-3 d-flex justify-content-end">
                      <span className="msg">{offerMsg}</span>
                    </div>
                  </div>
                )
              }
            }
          })}
        </Aux>
      )
      let msgHeaderButton =  
        <button className="offerBtn" onClick={this.sendOfferHandler}>Send Offer</button>
      if (responseStyle === 'confirm') {
        msgHeaderButton = 
          <button 
            onClick={this.sendFeedbackHandler}
            className="feedbackBtn">Leave Feedback</button>
      }
      // Message Component
      message = (
        <div className="expandMsg">
          {/* Message Header */}
            <div 
              className="d-flex align-items-center fullMessage">
              <div className="col-2 closeInput" onClick={this.expandHandler}>
              <img 
                className='ml-3 my-3 rounded-circle'
                src={picture}
                alt="icon" 
                height="80" width="80"/>
              </div>
              <div className="col-2 d-flex flex-column align-items-baseline">
                <span>{name}</span>
                <span>{date}</span>
              </div>
              <div className="col-5"></div>
              <div className="col-3">
                {/* <button className="offerBtn" onClick={this.sendOfferHandler}>Send Offer</button> */}
                {msgHeaderButton}
              </div>
            </div>
            {/* Start displaying Messages */}
            {allMessages}
            {/* End of displaying messages */}
            {/* Start of Send Message Input */}
            <div className="d-flex mt-2">
              <div className="col-11">
                <input 
                  onChange={(event) => this.onInputHandler(event)}
                  className="form-control my-3 msgInput" 
                  value={this.state.messageInput}
                  type="text" 
                  placeholder="Write a message"/>
              </div>
              <div className="col-1 d-flex my-3 justify-content-center">
                <button 
                  onClick={this.onSendMessageHandler}
                  className="sendBtn"
                  >Send</button>
              </div>
            </div>
          </div>
      )
    }
    return (
      <div className="mb-3">
        {message}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    submitting: state.setup.submitting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModalHandler: (modalData) => dispatch(actionModals.openModal(modalData)),
    sendReplyHandler: (token, reply) => dispatch(actionCreators.sendReply(token, reply)),
    onOfferMsgHandler: (id, token, offerResponse) => dispatch(actionCreators.updateOfferMsg(id, token, offerResponse))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);