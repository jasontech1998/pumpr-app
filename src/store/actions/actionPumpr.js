import axios from '../../axios-apps';

// Fetches Own User Profile
export const FETCH_PROFILE_START = 'FETCH_PROFILE_START';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAIL = 'FETCH_PROFILE_FAIL';
// Fetch Nav User Profile 
export const FETCH_NAV_PROFILE_FAIL = 'FETCH_NAV_PROFILE_FAIL';
export const FETCH_NAV_PROFILE_SUCCESS = 'FETCH_NAV_PROFILE_SUCCESS';
// Fetches Other User Profiles
export const FETCH_OTHER_PROFILE_START = 'FETCH_OTHER_PROFILE_START';
export const FETCH_OTHER_PROFILE_SUCCESS = 'FETCH_OTHER_PROFILE_SUCCESS';
export const FETCH_OTHER_PROFILE_FAIL = 'FETCH_OTHER_PROFILE_FAIL';

// Fetch User Reviews
export const FETCH_REVIEW_START = 'FETCH_REVIEW_START';
export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
export const FETCH_REVIEW_FAIL = 'FETCH_REVIEW_FAIL';

// Submit Post on Dashboard
export const POST_START = 'POST_START';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAIL = 'POST_FAIL';
// Submit Feedback 
export const POST_FB_START = 'POST_FB_START';
export const POST_FB_SUCCESS = 'POST_FB_SUCCESS';
export const POST_FB_FAIL = 'POST_FB_FAIL';

// Fetch All User's Posts on Dashboard
export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';

// Fetch one user's posts on Timeline
export const FETCH_OWN_POSTS_START = 'FETCH_OWN_POSTS_START';
export const FETCH_OWN_POSTS_SUCCESS = 'FETCH_OWN_POSTS_SUCCESS';
export const FETCH_OWN_POSTS_FAIL = 'FETCH_OWN_POSTS_FAIL';

// Update Likes on Post
export const UPDATE_LIKES_START = 'UPDATE_LIKES_START';
export const UPDATE_LIKES_SUCCESS = 'UPDATE_LIKES_SUCCESS';
export const UPDATE_LIKES_FAIL = 'UPDATE_LIKES_FAIL';

// Update Message on Accept/Decline Offer
export const UPDATE_MSG_START = 'UPDATE_MSG_START';
export const UPDATE_MSG_SUCCESS = 'UPDATE_MSG_SUCCESS';
export const UPDATE_MSG_FAIL = 'UPDATE_MSG_FAIL';
// Delete Post
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'

// Submit First Group Chat and Message
export const POST_GROUP_START = 'POST_GROUP_START';
export const POST_GROUP_SUCCESS = 'POST_GROUP_SUCCESS';
export const POST_GROUP_FAIL = 'POST_GROUP_FAIL';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';

// Fetch Messages
export const FETCH_MESSAGES_START = 'FETCH_MESSAGES_START';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAIL = 'FETCH_MESSAGES_FAIL';

// Log Out Remove State other User Datas
export const LOGOUT_PUMPR = 'LOGOUT_PUMPR';

// Remove data from state
export const REMOVE_DATA = 'REMOVE_DATA';

// Remove posts from state
export const REMOVE_POSTS = 'REMOVE_POSTS';

// Update Calendar
export const UPDATE_CALENDAR_START = 'UPDATE_CALENDAR_START';
export const UPDATE_CALENDAR_SUCCESS = 'UPDATE_CALENDAR_SUCCESS';
export const UPDATE_CALENDAR_FAIL = 'UPDATE_CALENDAR_FAIL';


export const updateCalendarStart = () => {
  return {
    type: UPDATE_CALENDAR_START
  }
}

export const updateCalendarSuccess = (ownData) => {
  return {
    type: UPDATE_CALENDAR_SUCCESS,
    ownData: ownData
  }
}

export const updateCalendarFail = (error) => {
  return {
    type: UPDATE_CALENDAR_FAIL,
    error: error
  }
}

export const updateCalendar = (key, profile, token) => {
  return dispatch => {
    dispatch(updateCalendarStart())
    axios.put(`https://pumpr-182dc.firebaseio.com/userProfiles/${key}.json?auth=${token}`, profile)
      .then(response => {
        dispatch(updateCalendarSuccess(response.data));
      })
      .catch(error => {
        dispatch(updateCalendarFail(error));
      })
  }
}

export const removePosts = () => {
  return {
    type: REMOVE_POSTS
  }
}

export const removeData = () => {
  return {
    type: REMOVE_DATA
  }
}
export const logoutPumpr = () => {
  return {
    type: LOGOUT_PUMPR
  }
}
export const postGroupStart = () => {
  return {
    type: POST_GROUP_START
  }
}

export const postGroupSuccess = () => {
  return {
    type: POST_GROUP_SUCCESS
  }
}

export const postMessageSuccess = () => {
  return {
    type: POST_MESSAGE_SUCCESS
  }
}

export const postGroupFail = (error) => {
  return {
    type: POST_GROUP_FAIL,
    error: error
  }
}
// Action for sending offer
export const postOfferMsg = (token, message) => {
  return dispatch => {
    dispatch(postGroupStart())
    axios.post('/messages.json?auth=' + token, message)
    .then(response => {
      dispatch(postMessageSuccess())
      console.log(response)
    })
  }
}
// Action for sending first message from user's profile
export const postGroupMsg = (token, groupMsgUsers, content, date, receiverName, senderName, receiverPic, senderPic, receiverGym, senderGym) => {
  return dispatch => {
    dispatch(postGroupStart())
    axios.post('/groupMsgs.json?auth=' + token, groupMsgUsers)
      .then(response => {
        const msgData = {
          senderUserId: groupMsgUsers.userIds[0],
          receiverUserId: groupMsgUsers.userIds[1],
          content: content,
          date: date,
          receiverGym: receiverGym,
          senderGym: senderGym,
          receiverName: receiverName,
          senderName: senderName,
          receiverPic: receiverPic,
          senderPic: senderPic
        }
        const groupMessage = {
          groupId: response.data.name,
          msgData: msgData
        }
        dispatch(postGroupSuccess())
        return axios.post('/messages.json?auth=' + token, groupMessage)
      })
      .then(response => {
        dispatch(postMessageSuccess())
      })
      .catch(error => {
        dispatch(postGroupFail(error))
      })
  }
}
// Action for sending Message Reply
export const sendReply = (token, reply) => {
  return dispatch => {
    axios.post('/messages.json?auth=' + token, reply)
      .then(response => {
        dispatch(postMessageSuccess())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const updateLikesStart = () => {
  return {
    type: UPDATE_LIKES_START
  }
}

export const updateLikesSuccess = () => {
  return {
    type: UPDATE_LIKES_SUCCESS
  }
}

export const updateLikesFail = (error) => {
  return {
    type: UPDATE_LIKES_FAIL,
    error: error
  }
}
// Action for updating likes
export const updateLikes = (post, key, token) => {
  return dispatch => {
    dispatch(updateLikesStart())
    axios.put(`https://pumpr-182dc.firebaseio.com/userPosts/${key}.json?auth=${token}`, post)
      .then(response => {
        dispatch(updateLikesSuccess());
      })
      .catch(error => {
        dispatch(updateLikesFail(error));
      })
  }
}
export const updateMsgStart = () => {
  return {
    type: UPDATE_MSG_START
  }
}

export const updateMsgSuccess = () => {
  return {
    type: UPDATE_MSG_SUCCESS
  }
}

export const updateMsgFail = (error) => {
  return {
    type: UPDATE_MSG_FAIL,
    error: error
  }
}

// Action for updating offer message
export const updateOfferMsg = (key, token, offerResponse) => {
  return dispatch => {
    dispatch(updateMsgStart());
    axios.patch(`https://pumpr-182dc.firebaseio.com/messages/${key}.json?auth=${token}`, offerResponse)
      .then(response => {
        dispatch(updateMsgSuccess());
      })
      .catch(error => {
        dispatch(updateMsgFail(error));
      })
  }
}

export const deletePostSuccess = () => {
  return {
    type: DELETE_POST_SUCCESS
  }
}
// Action for deleting post
export const deletePost = (token, key) => {
  return dispatch => {
    axios.delete(`https://pumpr-182dc.firebaseio.com/userPosts/${key}.json?auth=${token}`)
      .then(response => {
        dispatch(deletePostSuccess())
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// Fetches All User Posts for Dashboard
export const fetchPosts = (token) => {
  return dispatch => {
    dispatch(postStart())
    axios.get('/userPosts.json?auth=' + token +'"')
      .then(response => {
        dispatch(fetchPostsSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchPostsFail(error))
      })
  }
}

// Fetches One User Posts for Profile Timeline
export const fetchOwnPosts = (token, userId) => {
  return dispatch => {
    dispatch(fetchOwnPostsStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/userPosts.json' + queryParams)
      .then(response => {
        dispatch(fetchOwnPostsSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchOwnPostsFail(error))
      })
  }
}


export const fetchOwnPostsStart = () => {
  return {
    type: FETCH_OWN_POSTS_START
  }
}

export const fetchOwnPostsSuccess = (posts) => {
  return {
    type: FETCH_OWN_POSTS_SUCCESS,
    posts: posts
  }
}

export const fetchOwnPostsFail = (error) => {
  return {
    type: FETCH_OWN_POSTS_FAIL,
    error: error
  }
}

export const fetchPostsStart = () => {
  return {
    type: FETCH_POSTS_START
  }
}

export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts: posts
  }
}

export const fetchPostsFail = (error) => {
  return {
    type: FETCH_POSTS_FAIL,
    error: error
  }
}
export const feedbackStart = () => {
  return {
    type: POST_FB_START
  }
}
export const feedbackSuccess = () => {
  return {
    type: POST_FB_SUCCESS
  }
}
export const feedbackFail = (error) => {
  return {
    type: POST_FB_FAIL,
    error: error
  }
}
// Action for Submitting Feedback to Database
export const submitFeedback = (token, feedback) => {
  return dispatch => {
    dispatch(feedbackStart());
    axios.post('/reviews.json?auth=' + token, feedback)
      .then(response => {
        console.log(response)
        dispatch(feedbackSuccess())
      })
      .catch(error => {
        dispatch(feedbackFail(error))
      })
  }
}
// Action for Submitting Post to Database
export const submitPost = (token, post) => {
  return dispatch => {
    dispatch(postStart());
    axios.post('/userPosts.json?auth=' + token, post)
      .then(response => {
        dispatch(postSuccess())
      })
      .catch(error => {
        dispatch(postFail(error))
      })
  }
}
export const postStart = () => {
  return {
    type: POST_START
  }
}

export const postSuccess = () => {
  return {
    type: POST_SUCCESS
  }
}

export const postFail = (error) => {
  return {
    type: POST_FAIL,
    error: error
  }
}



// Fetches Other User Profiles Start
export const fetchOtherProfileStart = () => {
  return {
    type: FETCH_OTHER_PROFILE_START
  }
}

export const fetchOtherProfileFail = (error) => {
  return {
    type: FETCH_OTHER_PROFILE_FAIL,
    error: error
  }
}

export const fetchOtherProfileSuccess = (data, userId) => {
  return {
    type: FETCH_OTHER_PROFILE_SUCCESS,
    data: data,
    userId: userId
  }
}

export const fetchOtherProfile = (token, userId) => {
  return dispatch => {
    dispatch(fetchOtherProfileStart());
    const queryParams = '?auth=' + token + '"';
    axios.get('/userProfiles.json' + queryParams)
      .then(response => {
        dispatch(fetchOtherProfileSuccess(response.data, userId))
      })
      .catch(error => {
        dispatch(fetchOtherProfileFail(error))
      })
  }
}

// Fetches One Profile Start
export const fetchProfileStart = () => {
  return {
    type: FETCH_PROFILE_START
  }
}

export const fetchProfileFail = (error) => {
  return {
    type: FETCH_PROFILE_FAIL,
    error: error
  }
}

export const fetchProfileSuccess = (data) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    data: data
  }
}
// Fetches User Reviews
export const fetchReviewStart = () => {
  return {
    type: FETCH_REVIEW_START
  }
}
export const fetchReviewSuccess = (reviews) => {
  return {
    type: FETCH_REVIEW_SUCCESS,
    reviews: reviews
  }
}
export const fetchReviewFail = (error) => {
  return {
    type: FETCH_REVIEW_FAIL,
    error: error
  }
}
// Fetches profile data
export const fetchProfile = (token, userId) => {
  return dispatch => {
    // start of fetching user profile data
    dispatch(fetchProfileStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/userProfiles.json' + queryParams)
      .then(response => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key
          })
        }
        dispatch(fetchProfileSuccess(fetchedData[0]))
      })
      .catch(error => {
        dispatch(fetchProfileFail(error))
      })
  }
}
// Fetches User Reviews
export const fetchReviews = (token, userId) => {
  return dispatch => {
    // start of fetching user reviews
    dispatch(fetchReviewStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/reviews.json' + queryParams)
      .then(response => {
        const fetchedReviews = [];
        for (let key in response.data) {
          fetchedReviews.push({
            ...response.data[key].review,
            id: key
          })
        }
        dispatch(fetchReviewSuccess(fetchedReviews))
      })
      .catch(error => {
        dispatch(fetchReviewFail(error))
      })
  }
}
// Fetches Messages
export const fetchMessages = (token, userId) => {
  return dispatch => {
    dispatch(fetchMessagesStart())
    const queryParams = '?auth=' + token + '"';
    // get all groupMsgs
    axios.get('/groupMsgs.json' + queryParams)
      .then(response => {
        // Loop through response and find all groupMsgs the user is in
        // initialize empty array to store promises in
        let promiseArray = []
        for (let key in response.data) {
          // if user is included, use the groupId to find the associated messages
          if (response.data[key].userIds.includes(userId)) {
            // save the groupID
            let groupId = key;
            // Use the groupId to fetch messages
            const queryP = '?auth=' + token + '&orderBy="groupId"&equalTo="' + groupId + '"';
            // Store promises in promise Array
            promiseArray.push(axios.get('/messages.json' + queryP));
          }
        }
        // is called after all actions are done
        Promise.all(promiseArray)
          .then(response => {
            // initialize empty array 
            let dataArr = [] 
            // turn response object into array
            for (let key of response) {
              let sortedArr = []
              let responseObj = key.data
              for (let [key, value] of Object.entries(responseObj)) {
                sortedArr.push({
                  key: key,
                  value: value
                });
              }
              // sort the array by key
              sortedArr.sort(function(a,b) {
                return (a.key < b.key ? -1 : 1)
              });
              // remove key and store value in dataArr
              for (let key of sortedArr) {
                // dataArr.push(key.value)
                dataArr.push({key: key.key, data: key.value})
              };
            }
            // send array of messages to reducer
            // the reducer will organize the messages by groupId
            dispatch(fetchMessagesSuccess(dataArr));
          })

      })
      // catch error
      .catch(error => {
        dispatch(fetchMessagesFail(error))
      })
  }
}

export const fetchMessagesStart = () => {
  return {
    type: FETCH_MESSAGES_START
  }
}

export const fetchMessagesSuccess = (data) => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    data: data
  }
}

export const fetchMessagesFail = (error) => {
  return {
    type: FETCH_MESSAGES_FAIL,
    error: error
  }
}

export const fetchNavProfileSuccess = (data) => {
  return {
    type: FETCH_NAV_PROFILE_SUCCESS,
    data: data
  }
}

export const fetchNavProfileFail = (error) => {
  return {
    type: FETCH_NAV_PROFILE_FAIL,
    error: error
  }
}
// Fetch own profile data for navbar
export const fetchNavProfile = (token, userId) => {
  return dispatch => {
    dispatch(fetchProfileStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/userProfiles.json' + queryParams)
      .then(response => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key
          })
        }
        dispatch(fetchNavProfileSuccess(fetchedData[0]))
      })
      .catch(error => {
        dispatch(fetchNavProfileFail(error))
      })
  }
}
