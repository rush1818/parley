import { connect } from 'react-redux';
import NavBar from './navbar.jsx';
import {logout} from '../../actions/session_actions.js';
import {clearSessionErrors} from '../../actions/error_actions.js';


const mapStateToProps = (state, ownProps) => {
  let loggedIn, username;
  loggedIn = state.session.currentUser ? true : false;
  username = state.session.currentUser ? state.session.currentUser.username : "none";
  return ({
    loggedIn,
    username
  });
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    logout: () => dispatch(logout()),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
