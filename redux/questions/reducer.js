import {
  FETCH_QUESTIONS,
  DONE_QUESTIONS,
  SUCCESS_QUESTIONS,
  ERROR_QUESTIONS,
  SET_QUESTIONS
} from "redux/constants";
const initialState = { questionsList: [], loading: false, error: false };

export default function QuestionsList(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_QUESTIONS:
      return { ...state, loading: true };
    case DONE_QUESTIONS:
      return { ...state, loading: false };
    case SUCCESS_QUESTIONS:
      return { ...state, questionsList: payload, error: false };
    case ERROR_QUESTIONS:
      return { ...state, error: true };
    default:
      return state;
  }
}
