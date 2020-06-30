import React, {Component} from 'react'
import {connect} from 'react-redux';
import PumprSchedule from '../../PumprSchedule/pumprSchedule';
import Modal from '../../../Components/UI/Modal/Modal';
import ScheduleModal from '../../ProfileSetUp/GymSchedule/ScheduleModal';
import * as actionModals from '../../../store/actions/actionSetup';

class ScheduleSettings extends Component {
  state = {
    day: '',
    addedInputs: 0,
    fromInput: '',
    toInput: '',
    fromInput2: '',
    toInput2: '',
    fromInput3: '',
    toInput3: '',
    freeTime: null
  }
  addInputHandler = () => {
    this.setState(prevState => {
      return {addedInputs: prevState.addedInputs + 1}
    });
  }
  
  removeInputHandler = () => {
    // If secondInput removed, clear inputs
    if (this.state.addedInputs === 1) {
      this.setState(prevState => {
        return {fromInput2: '', toInput2: ''}
      });
    }
    // If thirdInput removed, clear inputs
    else if (this.state.addedInputs === 2) {
      this.setState(prevState => {
        return {fromInput3: '', toInput3: ''}
      });
    }
    this.setState(prevState => {
      return {addedInputs: prevState.addedInputs - 1}
    });
  }
  

  showModalHandler = (day) => {
    this.setState({day: day});
    this.props.openModalHandler();
  }

  hideModalHandler = () => {
    this.setState({freeTime: null, addedInputs: 0});
    this.props.closeModalHandler();
  }
  

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render () {
    return (
      <>
        <h3>Your Schedule</h3>
        <Modal
          closeModal={this.hideModalHandler} 
          show={this.props.submitting}>
            <ScheduleModal
              changed={(event) => this.onChangeHandler(event)}
              fromInput={this.state.fromInput}
              toInput={this.state.toInput}
              fromInput2={this.state.fromInput2}
              toInput2={this.state.toInput2}
              fromInput3={this.state.fromInput3}
              toInput3={this.state.toInput3}
              addedInputs={this.state.addedInputs}
              day={this.state.day}
              plusClicked={this.addInputHandler}
              minusClicked={this.removeInputHandler}
              onClick={this.onClickSubmit}/>
          </Modal>
          <PumprSchedule
            clicked={(day) => this.showModalHandler(day)} 
            profile={this.props.profile}
            history={this.props.history}
            day={this.state.day}
            freeTime={this.state.freeTime}
            clearTime={this.hideModalHandler}/>
          <button className="offerBtn">Save</button>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    submitting: state.setup.submitting,
    ownData: state.pumpr.ownData,
    data: state.pumpr.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    openModalHandler: () => dispatch(actionModals.openModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSettings);