import { connect } from 'react-redux';
import MessageIndex from './message_index.jsx';
import {requestAllMessages, createMessage, removeMessage} from '../../actions/message_actions.js';
import {requestUsers} from '../../actions/user_actions.js';

const mapStateToProps = (state, ownProps) => {
  if (state.session.currentUser) {
    return({
      messages: state.messages,
      currentUser: state.session.currentUser,
      users: state.users
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
    fetchMessages: (date) => dispatch(requestAllMessages(date)),
    createMessage: (message) => dispatch(createMessage(message)),
    fetchUsers: () => dispatch(requestUsers())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
