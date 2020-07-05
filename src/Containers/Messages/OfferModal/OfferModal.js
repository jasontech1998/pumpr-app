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
    this.props.closeModalHandler();
  }
  selectedHandler = (gym) => {
    if (this.state.selectedLocation !== gym) {
      this.setState({selectedLocation: gym});
    }
    else if (this.state.selectedLocation === gym) {
      this.setState({selectedLocation: null});
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  optionsHandler = (option) => {
    if (!this.state.selectedFeedback.includes(option)) {
      const copyArray = this.state.selectedFeedback.slice();
      copyArray.push(option);
      this.setState({selectedFeedback: copyArray}, () => console.log(this.state.selectedFeedback));
    }
    else {
      const copyArr = this.state.selectedFeedback.slice();
      const index = copyArr.indexOf(option);
      copyArr.splice(index, 1);
      this.setState({selectedFeedback: copyArr}, () => console.log(this.state.selectedFeedback));
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
      console.log(feedbackObj)
      this.setState({submitFeedbackError: false});
      const token = localStorage.getItem('token');
      // send review to database
      this.props.onPostFeedback(token, feedbackObj);
      this.hideModalHandler();
      console.log(this.props.modalData.groupIdKey);
      console.log(this.props.modalData.groupUserIds);
      // update groupMsg hasReviewed with userId
      // push userId into hasReviewed and remove first element if the placeholder is still there
      this.props.modalData.groupHasReviewed.push(localStorage.getItem('userId'));
      if (this.props.modalData.groupHasReviewed[0] === 0) {
        this.props.modalData.groupHasReviewed.shift();
      }
      const groupData = {
        userIds: this.props.modalData.groupUserIds,
        hasReviewed: this.props.modalData.groupHasReviewed
      }
      // send to firebase to update
      this.props.onUpdateHasReviewHandler(this.props.modalData.groupIdKey, token, groupData);
      console.log(groupData);
    }
    else {
      this.setState({submitFeedbackError: true});
    }
  }

  // User is sending work out offer
  submitOfferHandler = () => {
    if (this.state.selectedLocation === null || this.state.monthInput === '' || this.state.dayInput === '' || this.state.timeInput === '') {
      this.setState({submitOfferError: true});
    }
    else {
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
        default:
          break;
      };
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
        message: '',
        submitOfferError: false
      });
      this.props.onPostOfferMsg(token, groupMessage);
      this.hideModalHandler();
    }
  }
  render () {
    // Error Handling
    let errorMsg = null;
    if (this.state.submitOfferError) {
      errorMsg =  <p className="errorMsg">Please select the Month, Day, Time and Location for your work out offer.</p>;
    }
    else if (this.state.submitFeedbackError) {
      errorMsg =  <p className="errorMsg">Please fill out the entire form.</p>;
    }
    const options = [
      {value: "6 AM", text: "6 AM"},
      {value: "7 AM", text: "7 AM"},
      {value: "8 AM", text: "8 AM"},
      {value: "9 AM", text: "9 AM"},
      {value: "10 AM", text: "10 AM"},
      {value: "11 AM", text: "11 AM"},
      {value: "12 PM", text: "12 PM"},
      {value: "1 PM", text: "1 PM"},
      {value: "2 PM", text: "2 PM"},
      {value: "3 PM", text: "3 PM"},
      {value: "4 PM", text: "4 PM"},
      {value: "5 PM", text: "5 PM"},
      {value: "6 PM", text: "6 PM"},
      {value: "7 PM", text: "7 PM"},
      {value: "8 PM", text: "8 PM"},
      {value: "9 PM", text: "9 PM"},
      {value: "10 PM", text: "10 PM"},
      {value: "11 PM", text: "11 PM"},
      {value: "12 AM", text: "12 AM"},
      {value: "1 AM", text: "1 AM"},
      {value: "2 AM", text: "2 AM"},
      {value: "3 AM", text: "3 AM"},
      {value: "4 AM", text: "4 AM"},
      {value: "5 AM", text: "5 AM"}
    ];
    let timeInput = (
      options.map( o => {
        return (
          <option key={o.value} value={o.value}>{o.text}</option>
        )
      })
    );
    let days = 31;
    if (this.state.monthInput) {
      switch (this.state.monthInput) {
        case "February":
          days = 28;
          break;
        case "April":
          days = 30;
          break;
        case "June":
          days = 30;
          break;
        case "September":
          days = "30";
          break;
        case "November":
          days = "30";
          break;
        default:
          days = 31;
      }
    }
    let dayInput = [];
    for (let i = 1; i <= days; i++) {
      dayInput.push( <option key={i} value={i}>{i}</option>)
    }

    let modalDisplay = null;
    let name = null;
    let receiverGym = null;
    let senderGym = null;
    let selectGyms = null;
    if (this.props.modalData) {
      // if clicked on send offer, show send offer modal display
      if (this.props.modalData.receiverGym || this.props.modalData.senderGym) {
        name = this.props.modalData.receiverName;
        receiverGym = this.props.modalData.receiverGym;
        senderGym = this.props.modalData.senderGym;
        // check if there are two locations
        if (receiverGym !== "" && senderGym !== "") {
          // if both users go to the same gym
          if (receiverGym === senderGym) {
            selectGyms = (
              <div className="row justify-content-center mb-3">
                <div className="col-6">
                  <div 
                    onClick={() => this.selectedHandler(receiverGym)}
                    style={{padding: '10px 5px'}}
                    className={
                      `card card-body flex-fill 
                      ${this.state.selectedLocation === receiverGym ? 'selected' : 'notSelected'}`}>
                    {receiverGym}
                  </div>
                </div>
              </div>
            )
          }
          // users have different gym locations
          else {
            selectGyms = (
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
            )
          }
        }
        // else, either one of the gym locations is emtpy
        else if (receiverGym === "" || senderGym === "") {
          // check to see which gym is empty
          // if senderGym is empty
          if (senderGym === "") {
            selectGyms = (
              <div className="row justify-content-center mb-3">
                <div className="col-12" style={{maxWidth: '200px', fontSize: '14px'}}>
                  <div 
                    onClick={() => this.selectedHandler(receiverGym)}
                    style={{padding: '10px 5px'}}
                    className={
                      `card card-body flex-fill 
                      ${this.state.selectedLocation === receiverGym ? 'selected' : 'notSelected'}`}>
                    {receiverGym}
                  </div>
                </div>
              </div>
            )
          }
          // receiver gym is empty
          else if (receiverGym === "") {
            selectGyms = (
              <div className="row justify-content-center mb-3">
                <div className="col-12" style={{maxWidth: '200px', fontSize: '14px'}}>
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
            )
          }
        }
        modalDisplay = (
            <div>
              <h3 className="sendTitle my-3 ml-3">Send an offer to work out with {name}</h3>
              {errorMsg}
              <div className="d-flex mt-3 ml-3">
                <span>Input the date and time</span>
              </div>
              <div className="d-flex justify-content-center">
                <div className="d-flex" style={{maxWidth: '350px', minHeight: '50px'}}>
                  <select
                    onChange={(event) => this.onChangeHandler(event)}
                    className="form-control mr-3"
                    name="monthInput"
                    style={{minWidth: "130px"}}
                    defaultValue={"Default"}>
                    <option value="Default" disabled>Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select> 
                  <select
                    onChange={(event) => this.onChangeHandler(event)}
                    className="form-control timeOption mr-3"
                    name="dayInput"
                    defaultValue={"Default"}>
                    <option value="Default" disabled>Day</option>
                    {dayInput}
                  </select> 
                  <select
                    onChange={(event) => this.onChangeHandler(event)}
                    className="form-control mr-3"
                    name="timeInput"
                    style={{minWidth: "100px"}}
                    defaultValue={"Default"}>
                    <option value="Default" disabled>Time</option>
                    {timeInput}
                  </select> 
                </div>
              </div>
              <div className="d-flex my-3 ml-3">
                <span>Choose the gym location</span>
              </div>
              {/* Gym Location Selections */}
              {selectGyms}
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
                onClick={() => this.submitOfferHandler()} 
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
            <h3 className="sendTitle my-3 ml-3">Leave feedback</h3>
            {errorMsg}
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
                onClick={() => this.submitFeedbackHandler()} 
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
    ownData: state.pumpr.ownData,
    groupMsgs: state.pumpr.groupMsgs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostOfferMsg: (token, message) => dispatch(actionCreators.postOfferMsg(token, message)),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    onPostFeedback: (token, feedback) => dispatch(actionCreators.submitFeedback(token, feedback)),
    onUpdateHasReviewHandler:(key, token, groupData) => dispatch(actionCreators.updateHasReviewed(key, token, groupData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferModal);