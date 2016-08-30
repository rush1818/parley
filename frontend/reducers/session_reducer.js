import {merge} from 'lodash';
import {SESSION_CONSTANTS} from '../actions/session_actions.js';

const defaultState = Object.freeze({
  currentUser: null,
  errors: []
});

const SessionReducer = (state = defaultState, action) => {
  switch(action.type){
      case SESSION_CONSTANTS.RECEIVE_CURRENT_USER :
        return merge({}, state, {currentUser: action.user} );
      case SESSION_CONSTANTS.LOGOUT:
        return merge({}, defaultState) ;
      default:
        return state;
    }
};

export default SessionReducer;
