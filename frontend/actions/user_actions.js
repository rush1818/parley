export const USER_CONSTANTS = {
  REQUEST_USERS: 'REQUEST_USERS',
  RECEIVE_USERS: 'RECEIVE_USERS',
  SAVE_USER_LIST: 'SAVE_USER_LIST'
};

export const receiveUsers = (users) => ({
  type: USER_CONSTANTS.RECEIVE_USERS,
  users
});

export const requestUsers = () => ({
  type: USER_CONSTANTS.REQUEST_USERS,
});

export const saveUserList = (list) =>({
  type: USER_CONSTANTS.SAVE_USER_LIST,
  list
});
