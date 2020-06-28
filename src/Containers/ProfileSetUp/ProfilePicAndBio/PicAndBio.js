import React, {Component} from 'react';
import classes from './PicAndBio.module.css';
import Button from '../../../Components/UI/Button/Button';
import {storage} from '../../../Firebase/index';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/actionSetup';


class PicAndBio extends Component {
  state = {
    bioInput: '',
    url: ''
  };

  onChooseHandler = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({image: image}, this.showImage)
    };
  }

  showImage = () => {
    // object destructuring
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed",
      () => {
        storage.ref("images").child(image.name).getDownloadURL()
          .then(url => 
            this.setState({url}));
      }
    );
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const urlBio = {
        profileURL: this.state.url,
        profileBio: this.state.bioInput
      };
    this.props.submitBioHandler(urlBio);
    this.props.history.push('/profile-location');
  }

  changeBioHandler = (event) => {
    this.setState({bioInput: event.target.value});
  }

  render () {
    let profilePic = <img 
                        className={classes.Icon}
                        src={require('../../../Components/UI/Icons/social.svg')} 
                        alt="icon" 
                        height="125" width="125"/>;
    if (this.state.url !== ''){
      profilePic = (
                    <img
                      alt="profile-pic" 
                      src={this.state.url}
                      height="200"
                      width="200"
                      className="rounded-circle"></img>
      );
    }
    
    return (
      <div className="col d-flex justify-content-center">
        <div className={classes.PicAndBio}>
          <h2 className="text-center mb-4">add a profile pic</h2>
          {profilePic}
          <div className="mt-4">
            <input 
              onChange={(event) => this.onChooseHandler(event)}
              type="file" 
              accept="image/*"
              multiple= {false}
              ref={(ref) => this.upload = ref}
              hidden="hidden" />
            <button 
              className={classes.Btn}
              onClick={() => this.upload.click()}
              type="button">Upload</button>
            <div>
            </div>
          </div>
          <h3 className="text-center mt-5 mb-4">tell us more about yourself</h3>
          <form onSubmit={(event) => this.onSubmitHandler(event)}>
            <textarea
              onChange={(event) => this.changeBioHandler(event)} 
              className={classes.Bio} rows="6"
              value={this.state.bioInput}
              name='bio'
              placeholder='Things you can talk about: how long you have been working out, your hobbies, and other things about you that would be helpeful for potential partners to know'/>
            <div className="my-4">
              <Button>Next</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    submitBioHandler: (urlBio) => dispatch(actionCreators.submitBio(urlBio))
  }
}

export default connect(null, mapDispatchToProps)(PicAndBio);