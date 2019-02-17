import { FETCH_QUESTIONS } from 'redux/constants';

export function fetchQuestions() {
  return {
    type: FETCH_QUESTIONS
  }
}
