import {merge} from 'lodash';
import {ERROR_CONSTANTS} from '../actions/error_actions.js';

const defaultState = Object.freeze({
  sessionErrors: [],
  messageErrors: []
});

const ErrorReducer = (state = defaultState, action) => {
  switch(action.type){
      case ERROR_CONSTANTS.RECEIVE_SESSION_ERRORS:
        return merge({}, state, {sessionErrors: action.errors});
      case ERROR_CONSTANTS.RECEIVE_MESSAGE_ERRORS:
        return merge({}, state, {}, {messageErrors: action.errors});
      default:
        return state;
    }
};

export default ErrorReducer;
