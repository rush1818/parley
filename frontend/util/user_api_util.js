export const requestUsersAPI = (success) => {
  $.ajax({
    method: 'GET',
    url: '/api/users',
    success,
    errors: () => console.log('Error in Users')
  });
};
