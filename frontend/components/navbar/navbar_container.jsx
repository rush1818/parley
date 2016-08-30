import { connect } from 'react-redux';
import NavBar from './navbar.jsx';
import {logout} from '../../actions/session_actions.js';


const mapStateToProps = (state, ownProps) => {
  let loggedIn;
  loggedIn = state.session.currentUser ? true : false;
  return ({
    loggedIn
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
