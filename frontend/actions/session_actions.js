export const SESSION_CONSTANTS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SIGNUP: 'SIGNUP',
  RECEIVE_CURRENT_USER: 'RECEIVE_CURRENT_USER',
  RECEIVE_ERRORS: 'RECEIVE_ERRORS'
};
export const login = (user) => ({
  type: SESSION_CONSTANTS.LOGIN,
  user
});

// store.dispatch({type:"LOGOUT", user: {user:{username: 'user1', password: 111111}}})

export const logout = () => ({
  type: SESSION_CONSTANTS.LOGOUT,
});


export const signup = (user) => ({
  type: SESSION_CONSTANTS.SIGNUP,
  user
});
export const receiveCurrentUser = (user) => ({
  type: SESSION_CONSTANTS.RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = (errors) => ({
  type: SESSION_CONSTANTS.RECEIVE_ERRORS,
  errors
})
