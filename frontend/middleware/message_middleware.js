import {removeMessageAPI, createMessageAPI, receiveMessagesAPI} from '../util/message_api_util.js';
import {MESSAGE_ACTIONS, receiveNewMessage, removeMessage, receiveAllMessages} from '../actions/message_actions.js';
import {receiveMessageErrors} from '../actions/error_actions.js';
import { hashHistory } from 'react-router';


const SessionMiddleware = store => next => action => {

  const errorCallback = xhr => {
    const errors = xhr.responseJSON;
    store.dispatch(receiveMessageErrors(errors));
  };

  switch (action.type) {
    case MESSAGE_ACTIONS.CREATE_MESSAGE:
      const createSuccess = (data) => store.dispatch(receiveNewMessage(data));
      createMessageAPI(action.message, createSuccess, errorCallback);
      return next(action);
    case MESSAGE_ACTIONS.REMOVE_MESSAGE:
      removeMessageAPI(action.messageId, ()=>next(action));
      break;
    case MESSAGE_ACTIONS.REQUEST_ALL_MESSAGES:
      const receiveAllSuccess = (data) => store.dispatch(receiveAllMessages(data));
      receiveMessagesAPI(receiveAllSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};

export default SessionMiddleware;
