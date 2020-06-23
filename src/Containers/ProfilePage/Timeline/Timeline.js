import React, {Component} from 'react'

import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';
import * as actionModals from '../../../store/actions/actionSetup';
import PumprSchedule from '../../PumprSchedule/pumprSchedule';
import Modal from '../../../Components/UI/Modal/Modal';
import ScheduleModal from '../../ProfileSetUp/GymSchedule/ScheduleModal';

class Timeline extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-12">
          <h4>Schedule</h4>
          <Modal
          closeModal={this.hideModalHandler} 
          show={this.props.submitting}>
            <ScheduleModal/>
          </Modal>
          <PumprSchedule
            clicked={(day) => this.showModalHandler(day)} 
            data={this.props.data}
            ownData={this.props.ownData}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    submitting: state.setup.submitting,
    data: state.pumpr.data,
    ownData: state.pumpr.ownData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId)),
    closeModalHandler: () => dispatch(actionModals.closeModal()),
    openModalHandler: () => dispatch(actionModals.openModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);