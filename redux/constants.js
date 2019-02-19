var keyMirror = require("keymirror");

const KM = keyMirror({
  FETCH_QUESTIONS: null,
  DONE_QUESTIONS: null,
  SUCCESS_QUESTIONS: null,
  ERROR_QUESTIONS: null,
  SET_QUESTIONS: null,
  SET_CURRENT_RECORD: null,

  START_TIME: null,
  END_TIME: null,

  FETCH_USER_ANSWERS: null,
  DONE_USER_ANSWERS: null,
  SUCCESS_USER_ANSWERS: null,
  ERROR_USER_ANSWERS: null,
  SET_USER_ANSWERS: null,
  PUSH_USER_ANSWER: null
});

module.exports = KM;
