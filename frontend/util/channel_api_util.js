export const requestPubChannelsAPI = (success) => {
  $.ajax({
    method: 'GET',
    url: '/api/channels',
    success,
    errors: () => console.log('Error in Channels')
  });
};


export const createPubChannelAPI = (channel, success, error) => {
  $.ajax({
    method: 'POST',
    url: '/api/channels/public',
    data: {channel: channel},
    success,
    errors: () => console.log('Error in Channels')
  });
};


export const requestPrivateChannelsAPI = (success) => {
  $.ajax({
    method: 'GET',
    url: '/api/channels?private=1',
    success,
    errors: () => console.log('Error in PubChannels')
  });
};


export const createPrivateChannelAPI = (channel, success, error) => {
  $.ajax({
    method: 'POST',
    url: '/api/channels/private',
    data: {channel: channel},
    success,
    errors: () => console.log('Error in PriChannels')
  });
};


export const unsubscribeChannelAPI = (channelId, success, error) => {
  $.ajax({
    method: 'DELETE',
    url: `/api/channels/${channelId}`,
    success,
    errors: () => console.log('Error in PriChannels')
  });
};
