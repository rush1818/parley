export const MESSAGE_ACTIONS = {
  RECEIVE_NEW_MESSAGE: 'RECEIVE_NEW_MESSAGE',
  RECEIVE_ALL_MESSAGES: 'RECEIVE_ALL_MESSAGES',
  REQUEST_ALL_MESSAGES: 'REQUEST_ALL_MESSAGES',
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE'
};

export const receiveNewMessage = (message) => ({
  type: MESSAGE_ACTIONS.RECEIVE_NEW_MESSAGE,
  message
});

export const requestAllMessages = (date) => ({
  type: MESSAGE_ACTIONS.REQUEST_ALL_MESSAGES,
  date
});

export const receiveAllMessages = (messages) => ({
  type: MESSAGE_ACTIONS.RECEIVE_ALL_MESSAGES,
  messages
});

export const createMessage = (message) => ({
  type: MESSAGE_ACTIONS.CREATE_MESSAGE,
  message
});

export const removeMessage = (messageId) => ({
  type: MESSAGE_ACTIONS.REMOVE_MESSAGE,
  messageId
});
