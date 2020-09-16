import React , {Component} from 'react';
import CreateAPost from './CreateAPost/CreateAPost';
import RecentPosts from './RecentPosts/RecentPosts';
import PumprSchedule from '../PumprSchedule/pumprSchedule';
import './Dashboard.css';
import Aux from '../../hoc/Auxiliary';
import {connect} from 'react-redux';

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

  render () {
    return (
      <Aux>
        <div className="col-12">
          <h4 className="dashboardTitle">Dashboard</h4>
          <PumprSchedule
            history={this.props.history}
            ownData={this.props.ownData}
            />
        </div>
        <CreateAPost history={this.props.history} />
        <div className="col-12 recentPostsWrapper">
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