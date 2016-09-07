import {removeMessageAPI, createMessageAPI, receiveMessagesAPI} from '../util/message_api_util.js';
import {MESSAGE_ACTIONS, FETCH_CONDITIONS, receiveNewMessage, removeMessage, receiveAllMessages} from '../actions/message_actions.js';
import {receiveMessageErrors} from '../actions/error_actions.js';
import { hashHistory } from 'react-router';


const MessageMiddleware = store => next => action => {

  const errorCallback = xhr => {
    const errors = xhr.responseJSON;
    store.dispatch(receiveMessageErrors(errors));
  };

  switch (action.type) {
    case MESSAGE_ACTIONS.CREATE_MESSAGE:
      const createSuccess = (data) => {
        setTimeout(()=>{
          let messageList = document.getElementById("message-list-data");
          messageList.scrollTop = messageList.scrollHeight;
        },100);
        store.dispatch(receiveNewMessage(data));
      };
      createMessageAPI(action.channelId, action.message, createSuccess, errorCallback);
      return next(action);
    case MESSAGE_ACTIONS.REMOVE_MESSAGE:
      removeMessageAPI(action.messageId, ()=>next(action));
      break;
    case MESSAGE_ACTIONS.REQUEST_ALL_MESSAGES:
      let receiveAllSuccess;
      if (action.condition === FETCH_CONDITIONS.ALL_MESSAGES || action.condition === FETCH_CONDITIONS.FIRST_FETCH) {
         receiveAllSuccess = (data) => {
          setTimeout(()=>{
            if (!$(".msg-list-item").length) return;

            let len = $(".msg-list-item").length < 19 ? $(".msg-list-item").length : 20;
             $(".msg-list-item").get((len - 1)).scrollIntoView();
          },20);
          return store.dispatch(receiveAllMessages(data));
        };
      } else {
        receiveAllSuccess = (data) => {
          setTimeout(()=>{
            let len = $(".msg-list-item").length;
            $(".msg-list-item").get((len - 1)).scrollIntoView();
          },25);
         return store.dispatch(receiveAllMessages(data));
       };
       }
      receiveMessagesAPI(action.channelId, action.date, receiveAllSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};

export default MessageMiddleware;
