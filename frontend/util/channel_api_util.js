export const requestSubChannelsAPI = (success) => {
  $.ajax({
    method: 'GET',
    url: '/api/channels',
    success,
    errors: () => console.log('Error in Channels')
  });
};
