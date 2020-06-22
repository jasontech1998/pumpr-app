import React , {Component} from 'react';
import CreateAPost from './CreateAPost/CreateAPost';
import RecentPosts from './RecentPosts/RecentPosts';
import PumprSchedule from '../PumprSchedule/pumprSchedule';
import Aux from '../../hoc/Aux';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionPumpr';



class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.data) {
      let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userId')
      this.props.onFetchProfile(token, userId)
    }
  }
  render () {
    return (
      <Aux>
        <div className="col-12">
          <h4>Dashboard</h4>
          <PumprSchedule data={this.props.data}/>
        </div>
        <CreateAPost history={this.props.history} />
        <div className="col-12 mt-3" style={{padding: '0 90px'}}>
          {/* <h4 className="mt-2">recent posts</h4> */}
          <RecentPosts history={this.props.history}/>
        </div>
      </Aux>
    )
  }
}
const mapStateToProps = state => {
  return {
    data: state.pumpr.data,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);