import { requestSubChannelsAPI } from './../util/channel_api_util.js';
import {CHANNEL_CONSTANTS, receiveSubChannels} from '../actions/channel_actions.js';


const ChannelMiddleware = store => next => action => {

  switch (action.type) {
    case CHANNEL_CONSTANTS.REQUEST_ALL_SUB_CHANNELS:
      requestSubChannelsAPI((data) => store.dispatch(receiveSubChannels(data)));
      return next(action);
    default:
      return next(action);
  }
};

export default ChannelMiddleware;
