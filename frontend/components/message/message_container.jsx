import { connect } from 'react-redux';
import MessageIndex from './message_index.jsx';

const mapStateToProps = (state, ownProps) => {
  let loggedIn;
  loggedIn = state.session.currentUser ? true : false;
  return ({
    loggedIn
  });
};

export default connect(
  mapStateToProps,
  null
)(MessageIndex);
