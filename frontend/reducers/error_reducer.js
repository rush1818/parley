import {merge} from 'lodash';
import {ERROR_CONSTANTS} from '../actions/error_actions.js';

const defaultState = Object.freeze({
  sessionErrors: [],
  messageErrors: []
});

const ErrorReducer = (state = defaultState, action) => {
  switch(action.type){
      case ERROR_CONSTANTS.RECEIVE_SESSION_ERRORS:
        return merge({}, {sessionErrors: action.errors});
      case ERROR_CONSTANTS.RECEIVE_MESSAGE_ERRORS:
        return merge({}, {messageErrors: action.errors});
      case ERROR_CONSTANTS.CLEAR_SESSION_ERRORS:
        return merge({}, {sessionErrors: []});
      default:
        return state;
    }
};

export default ErrorReducer;
