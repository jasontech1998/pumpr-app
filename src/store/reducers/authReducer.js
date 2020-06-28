import * as actionTypes from '../actions/actionAuth';

const initialState = {
  token: '',
  userId: null,
  error: null,
  loading: false,
  doneSignUp: false,
  profileKey: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILE_SUCCESS:
      return {
        ...state,
        profileKey: action.userKey,
        fullName: action.fullName
      }
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        loading: false,
        doneSignUp: true
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        fullName: null,
        doneSignUp: false
      }
    default:
      return state;
  }
}

export default authReducer;