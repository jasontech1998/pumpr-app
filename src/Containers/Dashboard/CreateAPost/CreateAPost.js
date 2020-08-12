import React, {Component} from 'react';
import classes from './CreateAPost.module.css';
import './CreateAPost.css';
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
      this.setState({image: image}, this.showImage);
    };
  }

  showImage = () => {
    // send image to storage
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed",
      () => {
        storage.ref("images").child(image.name).getDownloadURL()
          .then(url => 
            this.setState({url}))
      }
    );
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.postInput !== '' && this.props.ownData) {
      const {fullName} = this.props.ownData.userSetup;
      const userProfilePic = this.props.ownData.userSetup.profile.profileURL;
      let month = new Date().toLocaleString('en-US', {month: 'short'});
      let day = new Date().getDate();
      let datePosted = `${month} ${day}`;
      const userId = localStorage.getItem('userId');
      const post = {
        fullName: `${fullName.firstName} ${fullName.lastName}`,
        userProfilePic: userProfilePic, 
        userId: userId,
        datePosted: datePosted,
        likes: 0,
        postPictureURL: this.state.url,
        postText: this.state.postInput
      };
      this.setState({postInput: '', url: '', image: null});
      const token = localStorage.getItem('token');
      this.props.submitPostHandler(token, post);
    }
    else {
      alert('Please fill out the text input');
    }
  }

  onChangeHandler = (event) => {
    this.setState({postInput: event.target.value});
  }


  render () {
    let showSelectedPic = <span className="ml-2" style={{color: "#C8C4CB"}}>None Selected</span>;
    if (this.state.image) {
      showSelectedPic = <span className="ml-2" style={{fontWeight: "500"}}>Image Selected</span>;
    };
    let postProfilePic = <img 
                        className='profilePic'
                        src={require('../../../Components/UI/Icons/social.svg')} 
                        alt="icon" 
                        height="130" width="130"/>;
    if (this.props.ownData) {
      const {profile} = this.props.ownData.userSetup;
      if (profile.profileURL !== "") {
        postProfilePic = <img 
                        className='rounded-circle profilePic'
                        src={profile.profileURL}
                        alt="profileImage" 
                        height="130" width="130"/>
      };
    };
    
    return (
      <div className="col-12 createAPost">
          <div className={classes.PostInputBox}>
            <div className={classes.Header}>
              <span className="ml-3" style={{fontWeight: '500'}}>create a post</span>
            </div>
            <div className="row" style={{height: '250px'}}>
              <div className="leftCol col-3 d-flex justify-content-center align-items-center">
                {postProfilePic}
              </div>
              <div className="rightCol col-9 d-flex">
                <form className="createPostForm"onSubmit={(event) => this.onSubmitHandler(event)}>
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
                      <div className="d-flex align-items-center">
                        <img
                          onClick={(event) => this.upload.click()}
                          className={classes.EnterInputImage} 
                          src={nature} 
                          alt="icon"/>
                        {showSelectedPic}
                      </div>
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