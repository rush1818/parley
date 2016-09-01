export const CHANNEL_CONSTANTS = {
  REQUEST_ALL_FEED_CHANNELS: 'REQUEST_ALL_FEED_CHANNELS',
  RECEIVE_ALL_FEED_CHANNELS: 'RECEIVE_ALL_FEED_CHANNELS',
  REQUEST_ALL_SUB_CHANNELS: 'REQUEST_ALL_SUB_CHANNELS',
  RECEIVE_ALL_SUB_CHANNELS: 'RECEIVE_ALL_SUB_CHANNELS',
  CREATE_PUB_CHANNEL: 'CREATE_PUB_CHANNEL',
  RECEIVE_PUB_CHANNEL: 'CREATE_CHANNEL',
  SUBSCRIBE_PUB_CHANNEL: 'SUBSCRIBE_PUB_CHANNEL'
};


export const requestFeedChannels = () => ({
  type: CHANNEL_CONSTANTS.REQUEST_ALL_FEED_CHANNELS
});

export const receiveFeedChannels = (channels) => ({
  type: CHANNEL_CONSTANTS.RECEIVE_ALL_FEED_CHANNELS,
  channels
});

export const requestSubChannels = () => ({
  type: CHANNEL_CONSTANTS.REQUEST_ALL_SUB_CHANNELS,
});

export const receiveSubChannels = (channels) => ({
  type: CHANNEL_CONSTANTS.RECEIVE_ALL_SUB_CHANNELS,
  channels
});

export const createPubChannel = (channel) =>({
  type: CHANNEL_CONSTANTS.CREATE_PUB_CHANNEL,
  channel
});

export const receivePubChannel = (channel) =>({
  type: CHANNEL_CONSTANTS.RECEIVE_PUB_CHANNEL,
  channel
});

export const subscribeChannel =(channelId) =>({
  type: CHANNEL_CONSTANTS.SUBSCRIBE_PUB_CHANNEL,
  channelId
});
