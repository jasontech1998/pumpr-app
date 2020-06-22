import axios from '../../axios-apps';

export const SUBMIT_LIFTS = 'SUBMIT_LIFTS';
export const SUBMIT_GOALS = 'SUBMIT_GOALS';
export const SUBMIT_BIO = 'SUBMIT_BIO';
export const SUBMIT_LOCATION = 'SUBMIT_LOCATION';
export const SUBMIT_SCHEDULE = 'SUBMIT_SCHEDULE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

export const ADD_SETUP_START = 'ADD_SET_UP_START';
export const ADD_SETUP_SUCCESS = 'ADD_SET_UP_SUCCESS';
export const ADD_SETUP_FAIL = 'ADD_SET_UP_FAIL';

export const addSetUp = (userProfile, token) => {
  return dispatch => {
    // Start
    dispatch(addSetUpStart())
    // Send to database with token
    axios.post('/userProfiles.json?auth=' + token, userProfile)
      .then(response => {
        // dispatch success (userProfile)
        console.log(response.data.name)
        dispatch(addSetUpSuccess(response.data.name, userProfile))
      })
      // dispatch fail (error)
      .catch(error => {
        dispatch(addSetUpFail(error))
      })
  }
}
export const addSetUpStart = () => {
  return {
    type: ADD_SETUP_START
  }
}
export const addSetUpSuccess = (id, userProfile) => {
  return {
    type: ADD_SETUP_SUCCESS,
    profileId: id,
    userProfile: userProfile
  }
}
export const addSetUpFail = (error) => {
  return {
    type: ADD_SETUP_FAIL,
    error: error
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