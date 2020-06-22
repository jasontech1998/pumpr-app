import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReviewList from '../../Reviews/SendReviews/reviewList';
import * as actionCreators from '../../../store/actions/actionPumpr';
import * as actionModals from '../../../store/actions/actionSetup';
import './OfferModal.css';

class OfferModal extends Component {
  state = {
    selectedLocation: null,
    monthInput: '',
    dayInput: '',
    timeInput: '',
    message: '',
    feedbackMsg: '',
    selectedFeedback: []
  }

  hideModalHandler = () => {
    this.props.closeModalHandler()
  }
  selectedHandler = (gym) => {
    if (this.state.selectedLocation !== gym) {
      this.setState({selectedLocation: gym})
    }
    else if (this.state.selectedLocation === gym) {
      this.setState({selectedLocation: null})
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  optionsHandler = (option) => {
    if (!this.state.selectedFeedback.includes(option)) {
      const copyArray = this.state.selectedFeedback.slice();
      copyArray.push(option)
      this.setState({selectedFeedback: copyArray}, () => console.log(this.state.selectedFeedback))
    }
    else {
      const copyArr = this.state.selectedFeedback.slice();
      const index = copyArr.indexOf(option);
      copyArr.splice(index, 1)
      this.setState({selectedFeedback: copyArr}, () => console.log(this.state.selectedFeedback))
    }
  }

  submitFeedbackHandler = () => {
    // store date sent
    let month = new Date().toLocaleString('en-US', {month: 'short'});
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    const dateSent = `${month} ${day}, ${year}`;
    // store as sender id
    console.log(this.props.modalData)
    console.log(this.props.ownData.userSetup.profile.profileURL)
    let userId = this.props.modalData.senderUserId;
    let senderPic = this.props.ownData.userSetup.profile.profileURL;
    let senderName = this.props.modalData.receiverName;
    // if current user id is not senderUserId, change to receiver
    if (localStorage.getItem('userId') === this.props.modalData.senderUserId) {
      userId = this.props.receiverUserId;
      senderName = this.props.modalData.senderName;
      senderPic = this.props.modalData.senderPic;
    }
    const review = {
      options: this.state.selectedFeedback,
      msg: this.state.feedbackMsg,
      senderPic: senderPic,
      senderName: senderName,
      date: dateSent
    }
    const feedbackObj = {
      userId: userId,
      review: review
    }
    console.log(feedbackObj)
    const token = localStorage.getItem('token');
    this.props.onPostFeedback(token, feedbackObj)
  }


  submitOfferHandler = () => {
    // store sender name
    const fullName = `${this.props.ownData.userSetup.fullName.firstName} ${this.props.ownData.userSetup.fullName.lastName}`;
    // store date sent
    let month = new Date().toLocaleString('en-US', {month: 'short'});
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    const dateSent = `${month} ${day}, ${year}`;
    let date = new Date(`${this.state.monthInput} ${this.state.dayInput}, 2020`).getDay();
    switch (date) {
      case 0:
        date = 'Sunday';
        break;
      case 1:
        date = 'Monday';
        break;
      case 2:
        date = 'Tuesday';
        break;
      case 3:
        date = 'Wednesday';
        break;
      case 4:
        date = 'Thursday';
        break;
      case 5:
        date = 'Friday';
        break;
      case 6: 
        date = 'Saturday';
        break;
    }
    const offerMsg = {
      fullName: fullName,
      selectedLocation: this.state.selectedLocation,
      monthInput: this.state.monthInput,
      dayInput: this.state.dayInput,
      timeInput: this.state.timeInput,
      message: this.state.message,
      weekDate: date,
      date: dateSent
    };
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const groupMessage = {
      groupId: this.props.modalData.groupId,
      msgOfferData: offerMsg,
      senderUserId: userId
    };
    // reset state
    this.setState({
      selectedLocation: null,
      monthInput: '',
      dayInput: '',
      timeInput: '',
      message: ''
    })
    this.props.onPostOfferMsg(token, groupMessage);
  }
  render () {
    let modalDisplay = null;
    let name = null;
    let receiverGym = null;
    let senderGym = null;
    if (this.props.modalData) {
      // if clicked on send offer, show send offer modal display
      if (this.props.modalData.receiverGym) {
        name = this.props.modalData.receiverName;
        receiverGym = this.props.modalData.receiverGym;
        senderGym = this.props.modalData.senderGym;
        modalDisplay = (
            <div>
              <h3 className="sendTitle my-3 ml-3">Send an offer to work out with {name}</h3>
              <div className="d-flex mt-3 ml-3">
                <span>Input the date and time</span>
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex" style={{maxWidth: '350px', minHeight: '50px'}}>
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    className="sendWhen month" 
                    name="monthInput"
                    type="text" 
                    placeholder="Month"/>
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    className="sendWhen day" 
                    name="dayInput"
                    type="number" 
                    placeholder="Day"/>
                  <input
                    onChange={(event) => this.onChangeHandler(event)} 
                    className="sendWhen time" 
                    name="timeInput"
                    type="text" 
                    placeholder="Time"/>
                </div>
              </div>
              <div className="d-flex my-3 ml-3">
                <span>Choose the gym location</span>
              </div>
              <div className="row justify-content-center mb-3">
                <div className="col-6" style={{maxWidth: '200px', fontSize: '14px'}}>
                  <div 
                    onClick={() => this.selectedHandler(receiverGym)}
                    style={{padding: '10px 5px'}}
                    className={
                      `card card-body flex-fill 
                      ${this.state.selectedLocation === receiverGym ? 'selected' : 'notSelected'}`}>
                    {receiverGym}
                  </div>
                </div>
                <div className="col-6" style={{maxWidth: '200px', fontSize: '14px'}}>
                  <div 
                    onClick={() => this.selectedHandler(senderGym)}
                    style={{padding: '10px 5px'}}
                    className={
                      `card card-body flex-fill 
                      ${this.state.selectedLocation === senderGym ? 'selected' : 'notSelected'}`}>
                    {senderGym}
                  </div>
                </div>
              </div>
              {/* Text area to add message */}
              <div>
                <textarea
                  onChange={(event) => this.onChangeHandler(event)}
                  className="msgInput mb-3"
                  name="message" 
                  rows="5"
                  placeholder="Send a message with your offer"/>
              </div>
              <button
                onClick={() => {this.submitOfferHandler(); this.hideModalHandler()} } 
                className="offerBtn">Send Offer</button>
            </div>
          )
      }
      // else, display feedback modal
      else {
        const userId = localStorage.getItem('userId');
        if (this.props.modalData.senderUserId === userId) {
          name = this.props.modalData.receiverName;
        }
        else {
          name = this.props.modalData.senderName;
        }
        modalDisplay = (
          <div style={{padding: '10px 10px'}}>
            <h3 className="sendTitle my-3 ml-3">Leave feedback for {name}</h3>
            <div className="d-flex mt-5">
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
                onClick={() => {this.submitFeedbackHandler(); this.hideModalHandler()} } 
                className="offerBtn">Submit Feedback</button>
          </div>
        )
      }
    }
    return modalDisplay;
  }
}

const mapStateToProps = state => {
  return {
    modalData: state.setup.modalData,
    ownData: state.pumpr.ownData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostOfferMsg: (token, message) => dispatch(actionCreators.postOfferMsg(token, message)),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    onPostFeedback: (token, feedback) => dispatch(actionCreators.submitFeedback(token, feedback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferModal);