export const ERROR_CONSTANTS = {
  RECEIVE_SESSION_ERRORS: 'RECEIVE_SESSION_ERRORS',
  RECEIVE_MESSAGE_ERRORS: 'RECEIVE_MESSAGE_ERRORS'
};

export const receiveSesionErrors = (errors) => ({
  type: ERROR_CONSTANTS.RECEIVE_SESSION_ERRORS,
  errors
});

export const receiveMessageErrors = (errors) => ({
  type: ERROR_CONSTANTS.RECEIVE_MESSAGE_ERRORS,
  errors
});
