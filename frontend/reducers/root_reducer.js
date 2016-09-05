import {combineReducers} from 'redux';
import SessionReducer from './session_reducer.js';
import ErrorReducer from './error_reducer.js';
import MessageReducer from './message_reducer.js';
import UserReducer from './user_reducer.js';
import ChannelReducer from './channel_reducer.js';
import PrivateChannelReducer from './channel_private_reducer.js';
import ChannelFeedReducer from './channels_feed_reducer.js';

export default combineReducers(
  {
    session: SessionReducer,
    errors: ErrorReducer,
    messages: MessageReducer,
    users: UserReducer,
    channels: ChannelReducer,
    privateChannels: PrivateChannelReducer,
    channelFeed: ChannelFeedReducer
  }
);
