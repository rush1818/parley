import {combineReducers} from 'redux';
import SessionReducer from './session_reducer.js';
import ErrorReducer from './error_reducer.js';
import MessageReducer from './message_reducer.js';


export default combineReducers(
  {
    session: SessionReducer,
    errors: ErrorReducer,
    messages: MessageReducer
  }
);
