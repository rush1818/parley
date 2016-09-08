export const ERROR_CONSTANTS = {
  RECEIVE_SESSION_ERRORS: 'RECEIVE_SESSION_ERRORS',
  RECEIVE_MESSAGE_ERRORS: 'RECEIVE_MESSAGE_ERRORS',
  CLEAR_SESSION_ERRORS: 'CLEAR_SESSION_ERRORS'
};

export const receiveSesionErrors = (errors) => ({
  type: ERROR_CONSTANTS.RECEIVE_SESSION_ERRORS,
  errors
});

export const receiveMessageErrors = (errors) => ({
  type: ERROR_CONSTANTS.RECEIVE_MESSAGE_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: ERROR_CONSTANTS.CLEAR_SESSION_ERRORS
});
