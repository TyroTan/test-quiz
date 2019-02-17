var keyMirror = require("keymirror");

const KM = keyMirror({
  FETCH_QUESTIONS: null,
  DONE_QUESTIONS: null,
  SUCCESS_QUESTIONS: null,
  ERROR_QUESTIONS: null,
  SET_QUESTIONS: null
});

module.exports = KM;
