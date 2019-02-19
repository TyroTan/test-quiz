import { PUSH_USER_ANSWER, SET_CURRENT_RECORD } from 'redux/constants';

export function pushUserAnswer(payload) {
  return {
    type: PUSH_USER_ANSWER,
    payload
  }
}

export function setCurrentRecord(payload) {
  return {
    type: SET_CURRENT_RECORD,
    payload
  }
}
