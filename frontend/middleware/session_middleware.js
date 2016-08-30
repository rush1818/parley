import {login, signup, logout} from './../util/session_api_util.js';
import {SESSION_CONSTANTS, receiveErrors, receiveCurrentUser} from '../actions/session_actions.js';


const SessionMiddleware = store => next => action => {
  const loginSuccess = (user) => (store.dispatch(receiveCurrentUser(user)));

  const errorCallback = xhr => {
    const errors = xhr.responseJSON;
    store.dispatch(receiveErrors(errors));
  };

  switch (action.type) {
    case SESSION_CONSTANTS.LOGIN:
      login(action.user, loginSuccess, errorCallback);
      return next(action);
    case SESSION_CONSTANTS.LOGOUT:
      return logout(() => next(action));
    case SESSION_CONSTANTS.SIGNUP:
      signup(action.user, loginSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};

export default SessionMiddleware;
