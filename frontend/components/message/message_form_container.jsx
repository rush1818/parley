import { connect } from 'react-redux';
import MessageForm from './message_form.jsx';
import {createMessage} from '../../actions/message_actions.js';

const mapStateToProps = (state, ownProps) => {
  return({
    channelId: parseInt(ownProps.channelId),  //This comes from message index
    channelName: ownProps.channelName
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createMessage: (channelId, message) => dispatch(createMessage(channelId, message))
  });
};

export default connect(
  null,
  mapDispatchToProps
)(MessageForm);
