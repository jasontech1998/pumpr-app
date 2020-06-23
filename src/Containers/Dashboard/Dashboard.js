import React , {Component} from 'react';
import CreateAPost from './CreateAPost/CreateAPost';
import RecentPosts from './RecentPosts/RecentPosts';
import PumprSchedule from '../PumprSchedule/pumprSchedule';
import Aux from '../../hoc/Aux';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';



class Dashboard extends Component {
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
          <h4>Dashboard</h4>
          <PumprSchedule data={this.props.ownData}/>
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
    ownData: state.pumpr.ownData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId)),
    removeDataPropHandler: () => dispatch(actionCreators.removeData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);