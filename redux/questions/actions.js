import { FETCH_QUESTIONS, START_TIME, END_TIME } from "redux/constants";

export function fetchQuestions() {
  return {
    type: FETCH_QUESTIONS
  };
}

export function startTime() {
  return {
    type: START_TIME
  };
}

export function endTime() {
  return {
    type: END_TIME
  };
}
