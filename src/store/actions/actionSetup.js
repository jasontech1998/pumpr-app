export const SUBMIT_LIFTS = 'SUBMIT_LIFTS';
export const SUBMIT_GOALS = 'SUBMIT_GOALS';
export const SUBMIT_BIO = 'SUBMIT_BIO';
export const SUBMIT_LOCATION = 'SUBMIT_LOCATION';
export const SUBMIT_SCHEDULE = 'SUBMIT_SCHEDULE';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

// Clear Profile Set Up Data
export const CLEAR_SET_UP_DATA = 'CLEAR_SET_UP_DATA';

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