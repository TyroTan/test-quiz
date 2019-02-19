import { createStackNavigator } from "react-navigation";
import { applyMiddleware, combineReducers } from "redux";
import configureStore from 'config/configureStore';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import { Provider, connect } from "react-redux";
import React from "react";

import AppNavigator from "./navigation/AppNavigator";


import reduxThunk from "redux-thunk";
import rootSaga from 'reduxFolder/rootSaga';
import createSagaMiddleware from "redux-saga";

import questionsReducer from "reduxFolder/questions/reducer";
import userAnswersReducer from "reduxFolder/user-answers/reducer";

const sagaMiddleware = createSagaMiddleware();

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  questions: questionsReducer,
  userAnswers: userAnswersReducer
});

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const App_ = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = state => {
  return { state: state.nav };
};
const AppWithNavigationState = connect(mapStateToProps)(App_);

const middlewares = [navMiddleware, reduxThunk, sagaMiddleware];
const store = configureStore(appReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
