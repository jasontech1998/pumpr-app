import React , {Component} from 'react';
import CreateAPost from './CreateAPost/CreateAPost';
import RecentPosts from './RecentPosts/RecentPosts';
import PumprSchedule from '../PumprSchedule/pumprSchedule';
import Aux from '../../hoc/Aux';
import {connect} from 'react-redux';
import Modal from '../../Components/UI/Modal/Modal';
import ScheduleModal from '../ProfileSetUp/GymSchedule/ScheduleModal';

import * as actionCreators from '../../store/actions/actionPumpr';
import * as actionModals from '../../store/actions/actionSetup';

class Dashboard extends Component {
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
  componentDidMount() {
    console.log('dashboard mounted')
    // remove data prop
    if (this.props.data) {
      console.log('remove data')
      this.props.removeDataPropHandler();
    }
  }

  addInputHandler = () => {
    this.setState(prevState => {
      return {addedInputs: prevState.addedInputs + 1}
    })
  }
  removeInputHandler = () => {
    // If secondInput removed, clear inputs
    if (this.state.addedInputs === 1) {
      this.setState(prevState => {
        return {fromInput2: '', toInput2: ''}
      })
    }
    // If thirdInput removed, clear inputs
    else if (this.state.addedInputs === 2) {
      this.setState(prevState => {
        return {fromInput3: '', toInput3: ''}
      })
    }
    this.setState(prevState => {
      return {addedInputs: prevState.addedInputs - 1}
    })
  }
  

  showModalHandler = (day) => {
    this.setState({day: day});
    this.props.openModalHandler();
  }

  hideModalHandler = () => {
    this.setState({freeTime: null, addedInputs: 0})
    this.props.closeModalHandler();
  }
  

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onClickSubmit = () => {
    switch (this.state.addedInputs) {
      case 2:
        console.log('2 inputs added')
        if ((this.state.fromInput && this.state.toInput && this.state.fromInput2 && this.state.toInput2 && this.state.fromInput3 && this.state.toInput3) === '') {
          alert('Please fill out all available inputs')
          break;
        }
        else {
          var freeTime = {
            freeTime: this.state.fromInput + ' - ' + this.state.toInput,
            freeTime2: this.state.fromInput2 + ' - ' + this.state.toInput2,
            freeTime3: this.state.fromInput3 + ' - ' + this.state.toInput3
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: '',
            fromInput2: '',
            toInput2: '',
            fromInput3: '',
            toInput3: '',})
          this.props.closeModalHandler();
          break;
        }
      case 1:
        console.log('1 input added')
        if ((this.state.fromInput && this.state.toInput && this.state.fromInput2 && this.state.toInput2) === '') {
          alert('Please fill out all available inputs')
          break;
        }
        else {
          freeTime = {
            freeTime: this.state.fromInput + ' - ' + this.state.toInput,
            freeTime2: this.state.fromInput2 + ' - ' + this.state.toInput2
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: '',
            fromInput2: '',
            toInput2: ''})
          this.props.closeModalHandler();
          break;
        }
      case 0:
        console.log('0 inputs added')
        if ((this.state.fromInput && this.state.toInput) ==='') {
          freeTime = {
            freeTime: ''
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: ''})
          break;
        }
        else {
          freeTime = {
            freeTime: this.state.fromInput + ' - ' + this.state.toInput
          }
          this.setState({
            ...this.state,
            freeTime,
            fromInput: '',
            toInput: ''})
          break;
        }
      default:
        console.log('error')
    }
  }

  render () {
    return (
      <Aux>
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
        <div className="col-12">
          <h4>Dashboard</h4>
          <PumprSchedule
            clicked={(day) => this.showModalHandler(day)} 
            data={this.props.ownData}
            day={this.state.day}
            freeTime={this.state.freeTime}
            clearTime={this.hideModalHandler}/>
        </div>
        <CreateAPost history={this.props.history} />
        <div className="col-12 mt-3" style={{padding: '0 90px'}}>
          <RecentPosts history={this.props.history}/>
        </div>
      </Aux>
    )
  }
}
const mapStateToProps = state => {
  return {
    data: state.pumpr.data,
    ownData: state.pumpr.ownData,
    submitting: state.setup.submitting
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId)),
    removeDataPropHandler: () => dispatch(actionCreators.removeData()),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    openModalHandler: () => dispatch(actionModals.openModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);