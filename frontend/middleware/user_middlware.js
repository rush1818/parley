import { requestUsersAPI } from './../util/user_api_util.js';
import {USER_CONSTANTS, receiveUsers} from '../actions/user_actions.js';
import { hashHistory } from 'react-router';


const UserMiddleware = store => next => action => {

  switch (action.type) {
    case USER_CONSTANTS.REQUEST_USERS:
      requestUsersAPI((data) => store.dispatch(receiveUsers(data)));
      return next(action);
    default:
      return next(action);
  }
};

export default UserMiddleware;
