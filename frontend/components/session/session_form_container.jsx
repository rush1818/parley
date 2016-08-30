import { connect } from 'react-redux';
import SessionForm from './session_form.jsx';
import {login, signup} from '../../actions/session_actions.js';

const mapStateToProps = (state, ownProps) => {
  let loggedIn;
  loggedIn = state.session.currentUser ? true : false;
  return ({
    loggedIn,
    errors: state.session.errors
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;
  return {
    processForm: user => dispatch(processForm(user)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
