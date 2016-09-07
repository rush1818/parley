import {login, signup, logout, demoLoginAPI} from './../util/session_api_util.js';
import {SESSION_CONSTANTS, receiveCurrentUser} from '../actions/session_actions.js';
import {receiveSesionErrors} from '../actions/error_actions.js';
import { hashHistory } from 'react-router';


const SessionMiddleware = store => next => action => {
  const loginSuccess = (user) => {
      const redirectLogin = setInterval((()=>{
        if (store.getState().session.currentUser) {
          hashHistory.push('/channels/general?1');
          clearInterval(redirectLogin);
        }
      }), 50);
      return store.dispatch(receiveCurrentUser(user));
  };

  const logoutSuccess = () =>{
    const redirectLogout = setInterval((()=>{
      if (!store.getState().session.currentUser) {
        hashHistory.push('/');
        clearInterval(redirectLogout);
      }
    }), 5);
    return next(action);
  };

  const errorCallback = xhr => {
    const errors = xhr.responseJSON;
    store.dispatch(receiveSesionErrors(errors));
  };

  switch (action.type) {
    case SESSION_CONSTANTS.LOGIN:
      login(action.user, loginSuccess, errorCallback);
      return next(action);
    case SESSION_CONSTANTS.LOGOUT:
      return logout(logoutSuccess);
    case SESSION_CONSTANTS.SIGNUP:
      signup(action.user, loginSuccess, errorCallback);
      return next(action);
    case SESSION_CONSTANTS.DEMO_LOGIN:
      demoLoginAPI(loginSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};

export default SessionMiddleware;
