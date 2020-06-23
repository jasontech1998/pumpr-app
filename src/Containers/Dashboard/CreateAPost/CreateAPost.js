import React, {Component} from 'react';
import classes from './CreateAPost.module.css';
import {storage} from '../../../Firebase/index';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionPumpr';
import nature from '../../../Components/UI/Images/nature.png';

class CreateAPost extends Component {

  state = {
    postInput: ''
  }

  onChooseHandler = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({image: image}, this.showImage)
    }
  }

  showImage = () => {
    // send image to 
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed",
      () => {
        storage.ref("images").child(image.name).getDownloadURL()
          .then(url => 
            this.setState({url}))
      }
    )
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.postInput !== '' && this.props.ownData) {
      const {fullName} = this.props.ownData.userSetup
      const userProfilePic = this.props.ownData.userSetup.profile.profileURL
      let month = new Date().toLocaleString('en-US', {month: 'short'})
      let day = new Date().getDate()
      let datePosted = `${month} ${day}`
      const userId = localStorage.getItem('userId')
      const post = {
        fullName: `${fullName.firstName} ${fullName.lastName}`,
        userProfilePic: userProfilePic, 
        userId: userId,
        datePosted: datePosted,
        likes: 0,
        postPictureURL: this.state.url,
        postText: this.state.postInput
      }
      this.setState({postInput: ''})
      const token = localStorage.getItem('token')
      this.props.submitPostHandler(token, post)
    }
  }

  onChangeHandler = (event) => {
    this.setState({postInput: event.target.value})
  }
  render () {
    let postProfilePic = <img 
                        className='ml-3 mb-3'
                        src={require('../../../Components/UI/Icons/social.svg')} 
                        alt="icon" 
                        height="100" width="100"/>
    if (this.props.ownData) {
      const {profile} = this.props.ownData.userSetup
      postProfilePic = <img 
                      className='ml-3 mb-3 rounded-circle'
                      src={profile.profileURL}
                      alt="icon" 
                      height="100" width="100"/>
    }
    return (
      <div className="col-12" style={{padding: '0 90px'}}>
          <div className={classes.PostInputBox} style={{height: '250px'}}>
            <div className={classes.Header}>
              <span className="ml-3" style={{fontWeight: '500'}}>create a post</span>
            </div>
            <div className="row" style={{height: '250px'}}>
              <div className="col-3 d-flex justify-content-center align-items-center">
                {postProfilePic}
              </div>
              <div className="col-9 d-flex">
                <form onSubmit={(event) => this.onSubmitHandler(event)}>
                  <textarea
                    onChange={(event) => this.onChangeHandler(event)}
                    value={this.state.postInput}
                    className={classes.PostInputArea} 
                    name="post" 
                    rows="3"
                    placeholder="Say something..."/>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-between py-2">
                    <input 
                      onChange={(event) => this.onChooseHandler(event)}
                      type="file" 
                      accept="image/*"
                      multiple= {false}
                      ref={(ref) => this.upload = ref}
                      hidden="hidden" />
                      <img
                        onClick={(event) => this.upload.click()}
                        className={classes.EnterInputImage} 
                        src={nature} alt="picture"/>
                      <button className={classes.EnterInput}>Post</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownData: state.pumpr.ownData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchProfile: (token, userId) => dispatch(actionCreators.fetchProfile(token, userId)),
    submitPostHandler: (token, post) => dispatch(actionCreators.submitPost(token, post))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateAPost);