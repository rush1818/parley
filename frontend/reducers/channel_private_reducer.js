import {merge} from 'lodash';
import {CHANNEL_CONSTANTS} from '../actions/channel_actions.js';


const PrivateChannelReducer = (state = {}, action) => {
  switch(action.type){
      case CHANNEL_CONSTANTS.RECEIVE_ALL_PRIVATE_CHANNELS :
        let result1 = {};
        action.channels.forEach(channel=>{
          result1[channel.id] = channel;
        });
        console.log(result1);
        return merge({}, state, result1 );
      case CHANNEL_CONSTANTS.RECEIVE_PRIVATE_CHANNEL:
        let newCh = action.channel;
        let newId = newCh.id;
        let returnCh = {[newId]: newCh};
        return merge({}, state, returnCh);
      default:
        return state;
    }
};

export default PrivateChannelReducer;
