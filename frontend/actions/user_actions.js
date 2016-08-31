export const USER_CONSTANTS = {
  REQUEST_USERS: 'REQUEST_USERS',
  RECEIVE_USERS: 'RECEIVE_USERS'
};

export const receiveUsers = (users) => ({
  type: USER_CONSTANTS.RECEIVE_USERS,
  users
});

export const requestUsers = () => ({
  type: USER_CONSTANTS.REQUEST_USERS,
});
