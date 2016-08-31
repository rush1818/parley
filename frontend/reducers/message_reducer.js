import {merge} from 'lodash';
import {MESSAGE_ACTIONS} from '../actions/message_actions.js';


const MessageReducer = (state = {}, action) => {
  switch(action.type){
      case MESSAGE_ACTIONS.REMOVE_MESSAGE:
        let newState = merge({}, state);
        delete newState[action.messageId];
        return newState;
      case MESSAGE_ACTIONS.RECEIVE_NEW_MESSAGE:
        let newMsg = {[action.message.id]: action.message};
      return merge({}, state, newMsg);
      case MESSAGE_ACTIONS.RECEIVE_ALL_MESSAGES:
        let allMsgs = {};
        let oldestDate = {};
        action.messages.forEach(msg => {
          allMsgs[msg.id] = msg;
          let currentDate = new Date(msg.date);
          if (!oldestDate['date']) oldestDate['date'] = currentDate;
          if (oldestDate['date'] && oldestDate['date'] > currentDate)
          oldestDate['date'] = currentDate;
        });
        return merge({}, state, allMsgs, oldestDate);
      default:
        return state;
    }
};

export default MessageReducer;
