import React, {Component} from 'react';
import classes from '../CreateAPost/CreateAPost.module.css';
import './RecentPosts.css';
import Aux from '../../../hoc/Aux';

import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';

class RecentPosts extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    this.props.onFetchPosts(token)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.postSuccess !== prevProps.postSuccess) {
      let token = localStorage.getItem('token')
      this.props.onFetchPosts(token)
    }
  }

  onLikeHandler = (post, likes, key) => {
    // if user already liked the post, remove the like
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')
    let updateLikes = likes + 1
    post['likes'] = updateLikes
    // if no one has liked the post, make new array
    if (post['userLikes'] === undefined) {
      post['userLikes'] = new Array(userId)
    }
    // if there is userLikes and it includes the users ID, remove like
    else if (post.userLikes.includes(userId)) {
      let updateLikes = likes - 1
      post['likes'] = updateLikes
      const userIndex = post['userLikes'].indexOf(userId)
      post['userLikes'].splice(userIndex, 1)
      
    }
    // if there are userLikes and it does not include userId, push into array
    else if (post['userLikes']) {
      post['userLikes'].push(userId)
    }
    this.props.updateLikesHandler(post, key, token)
    
  }
  onDeleteHandler = (key) => {
    let token = localStorage.getItem('token')
    this.props.onDeletePostHandler(token, key)
  }

  showProfileHandler = (userId) => {
    this.props.history.push('profile-about', userId);
  }


  render () {
    let showPosts = null;
    if (this.props.posts) {
      const posts = this.props.posts
      showPosts = (
        <Aux>
          {posts.map((post) => {
            let data = post.value
            let profilePicture = <img 
                                    className='ml-3 mb-3'
                                    onClick={() => this.showProfileHandler(data.userId)}
                                    src={require('../../../Components/UI/Icons/social.svg')} 
                                    alt="icon" 
                                    height="100" width="100"
                                    style={{cursor: "pointer"}}/>
            if (data.userProfilePic !== '') {
              profilePicture = <img
                              className='ml-3 mb-3 rounded-circle'
                              onClick={() => this.showProfileHandler(data.userId)}
                              alt="profile-pic" 
                              src={data.userProfilePic} 
                              height="100"
                              width="100"
                              style={{cursor: "pointer"}}
                              />
            }
            // Show post picture if there is picture URL 
            let postPicture = null
            if (data.postPictureURL !== undefined) {
              postPicture = <img
                              className="img-fluid"
                              src={data.postPictureURL}
                              alt="postPicture" 
                              height="200" width="200"/>
            }
            // show delete icon if matches userID
            let deleteIcon = null
            if (data.userId === this.props.ownData.userId) {
              deleteIcon = <i 
                onClick={() => this.onDeleteHandler(post.key)}
                className="mt-3 ml-auto fas fa-trash-alt"></i>
            }
            let redHeart = ''
            let userId = localStorage.getItem('userId')
            if (data.userLikes && data.userLikes.includes(userId)) {
              redHeart = 'liked'
            }

            return (
              <div key={post.key} style={{borderBottom: "1px solid #EBE8EE"}}>
                <div className="row">
                  <div className="col-2 d-flex mt-3 justify-content-center">
                    {profilePicture}
                  </div>
                  <div className="col-10 d-flex flex-column">
                    <div className="d-flex mr-3">
                      <span 
                        onClick={() => this.showProfileHandler(data.userId)}
                        className="mt-3" 
                        style={{fontWeight: "600", cursor: "pointer"}}>{data.fullName}</span>
                      <span className="ml-3 mt-3" style={{color: '#818D92'}}>{data.datePosted}</span>
                      {/* Only show Icon if user's post */}
                      {deleteIcon}
                    </div>
                    <div className="d-flex">
                      <span>{data.postText}</span>
                    </div>
                    {postPicture}
                    <div>
                      <i 
                        onClick={() => this.onLikeHandler(post.value, post.value.likes, post.key)}
                        className="fas fa-heart"
                        id={redHeart}/>
                      <span 
                        style={{fontWeight: '600'}}> {data.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Aux>
      )
    }
    return (
      <div className="recentPostsCard">
        <div className={classes.Header}>
          <span className="ml-3" style={{fontWeight: '500'}}>recent posts</span>
        </div>
        {showPosts}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    posts: state.pumpr.posts,
    ownData: state.pumpr.ownData,
    postSuccess: state.pumpr.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: (token) => dispatch(actionCreators.fetchPosts(token)),
    updateLikesHandler: (post, key, token) => dispatch(actionCreators.updateLikes(post, key, token)),
    onDeletePostHandler: (token, key) => dispatch(actionCreators.deletePost(token, key))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecentPosts);