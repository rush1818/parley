import {merge} from 'lodash';
import {CHANNEL_CONSTANTS} from '../actions/channel_actions.js';
// const defaultState = [];

const ChannelFeedReducer = (state = [], action) => {
  switch(action.type){
      case CHANNEL_CONSTANTS.RECEIVE_ALL_FEED_CHANNELS :
        return action.channels;
      default:
        return state;
    }
};

export default ChannelFeedReducer;
