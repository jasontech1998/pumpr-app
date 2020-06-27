import axios from '../../axios-apps';

export const SUBMIT_LIFTS = 'SUBMIT_LIFTS';
export const SUBMIT_GOALS = 'SUBMIT_GOALS';
export const SUBMIT_BIO = 'SUBMIT_BIO';
export const SUBMIT_LOCATION = 'SUBMIT_LOCATION';
export const SUBMIT_SCHEDULE = 'SUBMIT_SCHEDULE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

// For initializing profile after sign up 
export const SET_PROFILE_START = 'SET_PROFILE_START';
export const SET_PROFILE_SUCCESS = 'SET_PROFILE_SUCCESS';
export const SET_PROFILE_FAIL = 'SET_PROFILE_FAIL';

// Clear Profile Set Up Data
export const CLEAR_SET_UP_DATA = 'CLEAR_SET_UP_DATA';

export const setProfileStart = () => {
  return {
    type: SET_PROFILE_START
  }
}

export const setProfileSuccess = (userKey) => {
  return {
    type: SET_PROFILE_SUCCESS,
    userKey: userKey
  }
}

export const setProfileFail = (error) => {
  return {
    type: SET_PROFILE_FAIL,
    error: error
  }
}

export const setUpProfile = (token, userProfile) => {
  return dispatch => {
    dispatch(setProfileStart());
    axios.post('/userProfiles.json?auth=' + token, userProfile)
      .then(response => {
        console.log(response.data.name)
        dispatch(setProfileSuccess(response.data.name))
      })
      .catch(error => {
        dispatch(setProfileFail(error))
      })
  }

}

export const clearSetUpData = () => {
  return {
    type: CLEAR_SET_UP_DATA
  }
}

export const openModal = (data) => {
  return {
    type: OPEN_MODAL,
    data: data
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}

export const submitLifts = (lifts) => {
  return {
    type: SUBMIT_LIFTS,
    lifts: lifts
  }
}

export const submitGoals = (goals) => {
  return {
    type: SUBMIT_GOALS,
    goals: goals
  }
}

export const submitBio = (urlBio) => {
  return {
    type: SUBMIT_BIO,
    urlBio: urlBio
  }
}

export const submitLocation = (location) => {
  return {
    type: SUBMIT_LOCATION,
    location: location
  }
}

export const submitSchedule = (schedule) => {
  return {
    type: SUBMIT_SCHEDULE,
    schedule: schedule
  }
}