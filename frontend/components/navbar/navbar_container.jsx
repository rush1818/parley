import { connect } from 'react-redux';
import NavBar from './navbar.jsx';
import {logout} from '../../actions/session_actions.js';


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
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
