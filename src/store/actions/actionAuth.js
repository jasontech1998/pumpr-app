import axios from '../../axios-apps';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';

// For initializing profile after sign up 
export const SET_PROFILE_SUCCESS = 'SET_PROFILE_SUCCESS';

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expireTime');
  localStorage.removeItem('userId');
  return {
    type: LOGOUT
  }
}

export const checkAuthTime = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } 
    else {
      const expirationDate = new Date(localStorage.getItem('expireTime'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      } else {
        dispatch(logout());
      }
    }
  }
}

export const setProfileSuccess = (userKey, fullName) => {
  return {
    type: SET_PROFILE_SUCCESS,
    userKey: userKey,
    fullName: fullName
  }
}

export const auth = (email , password, isSignUp, fullName) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXRH-yPywgLuHkA1g74H1RnJ9L7rrQU30';
    // User is logging in
    if (!isSignUp) {
      console.log('log in');
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXRH-yPywgLuHkA1g74H1RnJ9L7rrQU30';
      axios.post(url, authData, fullName)
        .then(response => {
          const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          // Save data in local storage
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('expireTime', expireTime);
          localStorage.setItem('userId', response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId, fullName));
          dispatch(checkAuthTime(response.data.expiresIn));
        })
        .catch(error => {
          console.log(error.response.data.error.message);
          dispatch(authFail(error.response.data.error));
        })
    }
    // user is signing up
    else {
      console.log('sign up');
      axios.post(url, authData, fullName)
      // if success, store token, userId, and fullName in state
        .then(response => {
          const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          // Save data in local storage
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('expireTime', expireTime);
          localStorage.setItem('userId', response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(checkAuthTime(response.data.expiresIn));
          // Post userProfile on Database
          const lifts = [
            {bench: {
              weight: 0,
              reps: 0,
              sets: 0}
            },
            {squat: {
              weight: 0,
              reps: 0,
              sets: 0}
            },
            {deadlift: {
              weight: 0,
              reps: 0,
              sets: 0}
            }
          ];
          const userSetup = {
            lifts: lifts,
            goals: {
              experience: '',
              goals: ['']
            },
            fullName: fullName,
            profile: {
              profileURL: '',
              profileBio: ''
            }
          };
          const userProfile = {
            userSetup: userSetup,
            userId: localStorage.getItem('userId')
          };
          axios.post('/userProfiles.json?auth=' + response.data.idToken, userProfile)
            .then(response => {
              // Send profile key and fullName to store and save
              dispatch(setProfileSuccess(response.data.name, fullName));
            })
            .catch(error => {
              console.log(error);
            })
        })
        .catch(error => {
          console.log(error.response.data.error.message);
          dispatch(authFail(error.response.data.error));
        })
    }
  }
}