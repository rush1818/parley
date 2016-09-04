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
