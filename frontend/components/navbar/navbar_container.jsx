import { connect } from 'react-redux';
import NavBar from './navbar.jsx';

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
)(NavBar);
