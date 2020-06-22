import * as actionTypes from '../actions/actionSetup';

const initialState = {
  lifts: [],
  goals: null,
  profile: [],
  modalData: null,
  submitting: false
}

const setupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_LIFTS:
      console.log(action.lifts)
      return {
        ...state,
        lifts: action.lifts
      }
    case actionTypes.SUBMIT_GOALS:
      console.log(action.goals)
      return {
        ...state,
        goals: action.goals
      }
    case actionTypes.SUBMIT_BIO:
      const copy = Object.assign({}, state.profile)
      const updateCopy = Object.assign(copy, action.urlBio)
      return {
        ...state,
        profile: updateCopy
      } 
    case actionTypes.SUBMIT_LOCATION:
      const profileCopy = Object.assign({}, state.profile)
      const updateProfile = Object.assign(profileCopy, action.location)
      return {
        ...state,
        profile: updateProfile
      }
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        submitting: false,
        modalData: null
      }
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        submitting: true,
        modalData: action.data
      }
    case actionTypes.ADD_SETUP_START:
      return {
        ...state
      }
    case actionTypes.ADD_SETUP_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.ADD_SETUP_SUCCESS:
      return {
        lifts: [],
        goals: null,
        profile: [],
      }
    default:
      return state;
  }
}

export default setupReducer;