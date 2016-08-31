import { connect } from 'react-redux';
import MessageForm from './message_form.jsx';
import {createMessage} from '../../actions/message_actions.js';


const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createMessage: (message) => dispatch(createMessage(message))
  });
};

export default connect(
  null,
  mapDispatchToProps
)(MessageForm);
