import * as actionTypes from '../actions/actionPumpr';

const initialState = {
  data: '',
  ownData: '',
  posts: '',
  reviewsArray: null,
  otherUsers: '',
  messages: [],
  loading: false,
  error: null
}

// Find User Key and Remove
const findUserKey = (state, action) => {
  const users = Object.assign({}, action.data)
  for (let [key,value] of Object.entries(users)) {
    if (action.userId === value.userId) {
      let usersArray = [];
      const userKey = key
      for (let [key,value] of Object.entries(action.data)) {
        if (key !== userKey) {
          usersArray.push({
            key: key,
            value: value})
        }
      }
      // Returns an array of other users
      return {
        ...state,
        otherUsers: usersArray
      }
    }
  }
}

// Store posts object in an array
const intoArray = (state, action) => {
  const posts = Object.assign({}, action.posts)
  let postsArray = []
  for (let [key,value] of Object.entries(posts)) {
    postsArray.push({
      key: key,
      value: value})
  }
  // Reverse the array and return
  postsArray.reverse()
  return {
    ...state,
    posts: postsArray,
    loading: false
  }
}

const pumprReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT_PUMPR:
      return {
        ...state,
        data: '',
        ownData: '',
        otherUsers: '',
        messages: []
      }
    case actionTypes.REMOVE_DATA:
      return {
        ...state,
        data: '',
        reviewsArray: null
      }
    case actionTypes.REMOVE_POSTS:
      return {
        ...state,
        posts: ''
      }
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ownData: action.ownData
      }
    case actionTypes.UPDATE_CALENDAR_SUCCESS:
      return {
        ...state,
        ownData: action.ownData
      }
    case actionTypes.FETCH_PROFILE_START:
      return {
        ...state
      }
    case actionTypes.FETCH_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      }
    case actionTypes.FETCH_NAV_PROFILE_SUCCESS:
      return {
        ...state,
        ownData: action.data
      }
    case actionTypes.FETCH_OTHER_PROFILE_START:
      return {
        ...state
      }
    case actionTypes.FETCH_OTHER_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.FETCH_OTHER_PROFILE_SUCCESS:
      // Returns array of other users
      return findUserKey(state, action)
    case actionTypes.POST_START:
      return {
        ...state
      }
    case actionTypes.POST_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.POST_SUCCESS:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_POSTS_START:
      return {
        ...state
      }
    case actionTypes.FETCH_POSTS_SUCCESS:
      // Returns an array of posts
      return intoArray(state, action)
    case actionTypes.FETCH_OWN_POSTS_SUCCESS:
      return intoArray(state, action)
    case actionTypes.FETCH_POSTS_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.UPDATE_LIKES_START:
      return {
        ...state
      }
    case actionTypes.UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_LIKES_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: true
      }
    case actionTypes.POST_GROUP_START:
      return {
        ...state
      }
    case actionTypes.POST_GROUP_SUCCESS:
      return {
        ...state
      }
    case actionTypes.POST_GROUP_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_MSG_SUCCESS:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_MSG_FAIL:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.FETCH_REVIEW_SUCCESS:
      return {
        ...state,
        reviewsArray: action.reviews
      }
    case actionTypes.FETCH_GROUP_MSG_SUCCESS:
      return {
        ...state,
        groupMsgs: action.group
      }
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      // CONVERT INTO FUNCTION LATER
      // Organize all messages by GroupID
      // initialize array to store all different groupIds
      let groupIdArray = []
      // add all groupIds into array
      action.data.map((key) => {
        groupIdArray.push(key.data.groupId)
      })
      // Use Set to remove any duplicate groupIds
      const uniqueId = new Set(groupIdArray)
      // Convert back to array
      const uniqueIdArray = [...uniqueId]
      // Loop through each id and filter messages array by ID
      let organizedIds = []
      uniqueIdArray.map(id => {
        organizedIds.push(
          action.data.filter(key => key.data.groupId === id))
      })
      organizedIds.reverse()
      return {
        ...state,
        loading: false,
        messages: organizedIds
      }
    default:
      return state;
  }
}

export default pumprReducer;