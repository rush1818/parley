export const CHANNEL_CONSTANTS = {
  REQUEST_ALL_FEED_CHANNELS: 'REQUEST_ALL_FEED_CHANNELS',
  RECEIVE_ALL_FEED_CHANNELS: 'RECEIVE_ALL_FEED_CHANNELS',
  REQUEST_ALL_PUB_CHANNELS: 'REQUEST_ALL_PUB_CHANNELS',
  RECEIVE_ALL_PUB_CHANNELS: 'RECEIVE_ALL_PUB_CHANNELS',
  CREATE_PUB_CHANNEL: 'CREATE_PUB_CHANNEL',
  RECEIVE_PUB_CHANNEL: 'RECEIVE_PUB_CHANNEL',

  REQUEST_ALL_PRIVATE_CHANNELS: 'REQUEST_ALL_PRIVATE_CHANNELS',
  RECEIVE_ALL_PRIVATE_CHANNELS: 'RECEIVE_ALL_PRIVATE_CHANNELS',
  CREATE_PRIVATE_CHANNEL: 'CREATE_PRIVATE_CHANNEL',
  RECEIVE_PRIVATE_CHANNEL: 'RECEIVE_PRIVATE_CHANNEL',
  SUBSCRIBE_PUB_CHANNEL: 'SUBSCRIBE_PUB_CHANNEL'
};


export const requestFeedChannels = () => ({
  type: CHANNEL_CONSTANTS.REQUEST_ALL_FEED_CHANNELS
});

export const receiveFeedChannels = (channels) => ({
  type: CHANNEL_CONSTANTS.RECEIVE_ALL_FEED_CHANNELS,
  channels
});

export const requestPubChannels = () => ({
  type: CHANNEL_CONSTANTS.REQUEST_ALL_PUB_CHANNELS,
});

export const receivePubChannels = (channels) => ({
  type: CHANNEL_CONSTANTS.RECEIVE_ALL_PUB_CHANNELS,
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


export const requestPrivateChannels = () => ({
  type: CHANNEL_CONSTANTS.REQUEST_ALL_PRIVATE_CHANNELS,
});

export const receivePrivateChannels = (channels) => ({
  type: CHANNEL_CONSTANTS.RECEIVE_ALL_PRIVATE_CHANNELS,
  channels
});

export const createPrivateChannel = (channel) =>({
  type: CHANNEL_CONSTANTS.CREATE_PRIVATE_CHANNEL,
  channel
});

export const receivePrivateChannel = (channel) =>({
  type: CHANNEL_CONSTANTS.RECEIVE_PRIVATE_CHANNEL,
  channel
});
