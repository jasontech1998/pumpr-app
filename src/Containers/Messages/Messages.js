import React, {Component} from 'react';
import './Messages.css';
import Modal from '../../Components/UI/Modal/Modal';
import OfferModal from './OfferModal/OfferModal';
import Message from './Message/Message';
import Aux from '../../hoc/Aux';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';
import * as actionModals from '../../store/actions/actionSetup';
import {database} from '../../Firebase/index';

class Messages extends Component {

  state = {
    show: false,
    messagesLoaded: false
  }
  // Checks if new message has been sent
  componentWillMount(){
    let messagesRef = database.ref('messages');
    // Listens for when messages have been updated with a new child
    messagesRef.on('child_added', snapshot => {
      if (this.state.messagesLoaded) {
        // Fetch updated messages if previous messages are loaded
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        this.props.onFetchMessages(token, userId);
      }
    })
    // Fetch messages data and change state to true so new messages can be caught by child_added
    messagesRef.once('value', snapshot => {
      this.setState({messagesLoaded: true})
    })

  }
  // Fetch Messages Initially
  componentDidMount = () => {
    console.log('did mount')
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    this.props.onFetchMessages(token, userId);
  }
  componentDidUpdate = (prevProps) => {
    // console.log(prevProps.msgSuccess)
    // console.log(this.props.msgSuccess)
    if (this.props.msgSuccess !== prevProps.msgSuccess) {
      let token = localStorage.getItem('token');
      let userId = localStorage.getItem('userId');
      this.props.onFetchMessages(token, userId);
    };
  }

  hideModalHandler = () => {
    this.props.closeModalHandler();
  }

  render () {
    let showMessages = null;
    // Check if messagesArr has been updated with user messages
    if (this.props.messagesArr.length !== 0) {
      showMessages = (
        <Aux>
          {this.props.messagesArr.map((data) => {
            return (
              <Message
                key={data[0].data.groupId}
                msgData={data}
                history={this.props.history}/>
            )
          })}
        </Aux>
      )
    }
    return (
      <div className="col-12">
        <h4>Messages</h4>
        <Modal 
          closeModal={this.hideModalHandler}
          show={this.props.submitting}>
            <OfferModal />
        </Modal>
        {showMessages}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData,
    messagesArr: state.pumpr.messages,
    submitting: state.setup.submitting,
    msgSuccess: state.pumpr.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMessages: (token, userId) => dispatch(actionCreators.fetchMessages(token, userId)),
    closeModalHandler: () => dispatch(actionModals.closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);