import { connect } from 'react-redux';
import MessageIndex from './message_index.jsx';
import {requestAllMessages, createMessage, removeMessage, removeMessageFromStore} from '../../actions/message_actions.js';
import {requestUsers} from '../../actions/user_actions.js';

const mapStateToProps = (state, ownProps) => {
  if (state.session.currentUser) {
    return({
      messages: state.messages,
      currentUser: state.session.currentUser,
      users: state.users,
      own: ownProps,
      channelId: parseInt(ownProps.channelId),  //This comes from channel detail
      channelName: ownProps.channelName
    });
  } else {
    return({
      messages: state.messages
    });
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    removeMessage: (messageId) => dispatch(removeMessage(messageId)),

    fetchMessages: (condition, date) => dispatch(requestAllMessages(condition, date)),

    createMessage: (message) => dispatch(createMessage(message)),

    fetchUsers: () => dispatch(requestUsers()),

    removeMessageFromStore: (messageId) => dispatch(removeMessageFromStore(messageId))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
