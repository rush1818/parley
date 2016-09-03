import {merge} from 'lodash';
import {USER_CONSTANTS} from '../actions/user_actions.js';


const UserReducer = (state = {}, action) => {
  switch(action.type){
      case USER_CONSTANTS.RECEIVE_USERS :
        let newUsers = {};
        let keys = Object.keys(action.users);
        action.users.forEach(user=>{
          newUsers[user.id] = user;
        });
        const ans = merge({}, state, {users: newUsers, arrayUsers: action.users} );
        return ans;
      case USER_CONSTANTS.SAVE_USER_LIST:
        let ans2 = merge({}, state);
        ans2['savedUsersList'] = action.list;
        return ans2;
      default:
        return state;
    }
};

export default UserReducer;
