import { requestPubChannelsAPI, createPubChannelAPI, requestPrivateChannelsAPI} from './../util/channel_api_util.js';
import {CHANNEL_CONSTANTS, receivePubChannels, receivePubChannel, receivePrivateChannels, receivePrivateChannel} from '../actions/channel_actions.js';


const ChannelMiddleware = store => next => action => {

  switch (action.type) {
    case CHANNEL_CONSTANTS.REQUEST_ALL_PUB_CHANNELS:
      requestPubChannelsAPI((data) => store.dispatch(receivePubChannels(data)));
      return next(action);
    case CHANNEL_CONSTANTS.CREATE_PUB_CHANNEL:
      createPubChannelAPI(action.channel, (data) =>{
        store.dispatch(receivePubChannel(data));
      } );
      return next(action);
    case CHANNEL_CONSTANTS.REQUEST_ALL_PRIVATE_CHANNELS:
      requestPrivateChannelsAPI((data) => {
        store.dispatch(receivePrivateChannels(data));
      });
      return next(action);
    case CHANNEL_CONSTANTS.CREATE_PRIVATE_CHANNEL:
      break;
    default:
      return next(action);
  }
};

export default ChannelMiddleware;
