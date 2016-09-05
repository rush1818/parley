import { requestPubChannelsAPI, createPubChannelAPI, requestPrivateChannelsAPI, createPrivateChannelAPI, unsubscribeChannelAPI} from './../util/channel_api_util.js';
import {CHANNEL_CONSTANTS, receivePubChannels, receivePubChannel, receivePrivateChannels, receivePrivateChannel, removeSingleChannel} from '../actions/channel_actions.js';
import { hashHistory } from 'react-router';

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
      createPrivateChannelAPI(action.channel, (data) => {
        store.dispatch(receivePrivateChannel(data));
      });
      return next(action);
    case CHANNEL_CONSTANTS.UNSUBSCRIBE_CHANNEL:
    unsubscribeChannelAPI(action.channelId, () =>{
      store.dispatch(removeSingleChannel(action.channelId));
      setTimeout(()=>{
        hashHistory.push("/channels/general?1");
      }, 100);
    });
    return next(action);
    default:
      return next(action);
  }
};

export default ChannelMiddleware;
