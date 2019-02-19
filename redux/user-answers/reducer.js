import { clone } from "utils/js-util";
import {
  FETCH_USER_ANSWERS,
  DONE_USER_ANSWERS,
  SUCCESS_USER_ANSWERS,
  ERROR_USER_ANSWERS,
  PUSH_USER_ANSWER,
  SET_CURRENT_RECORD
} from "redux/constants";
const initialState = {
  answers: [],
  currentRecord: {},
  loading: false,
  error: false
};

export default function userAnswers(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_USER_ANSWERS:
      return { ...state, loading: true };
    case DONE_USER_ANSWERS:
      return { ...state, loading: false };
    case SUCCESS_USER_ANSWERS:
      return { ...state, answers: payload, error: false };
    case ERROR_USER_ANSWERS:
      return { ...state, error: true };
    case PUSH_USER_ANSWER:
      return {
        ...state,
        answers: [...state.answers, payload]
      };
    case SET_CURRENT_RECORD:
      return {
        ...state,
        currentRecord: {
          answers: clone(state.answers),
          ...payload
        }
      };
    default:
      return state;
  }
}
