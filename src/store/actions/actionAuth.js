import axios from '../../axios-apps';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';

export const authStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = (token, userId, fullName) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    fullName: fullName
  }
}

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expireTime')
  localStorage.removeItem('userId')
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
    } else {
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

export const auth = (email , password, isSignUp, fullName) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXRH-yPywgLuHkA1g74H1RnJ9L7rrQU30'
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXRH-yPywgLuHkA1g74H1RnJ9L7rrQU30'
    }
    axios.post(url, authData, fullName)
      .then(response => {
        const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expireTime', expireTime)
        localStorage.setItem('userId', response.data.localId)
        dispatch(authSuccess(response.data.idToken, response.data.localId, fullName))
        dispatch(checkAuthTime(response.data.expiresIn))
      })
      .catch(error => {
        console.log(error.response.data.error.message);
        dispatch(authFail(error.response.data.error))
      })
  }
}