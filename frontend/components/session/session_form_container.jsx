import { connect } from 'react-redux';
import SessionForm from './session_form.jsx';
import {login, signup, demoLogin} from '../../actions/session_actions.js';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  errors: state.errors.sessionErrors
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    login: (data) => dispatch(login(data)),
    signup: (data) => dispatch(signup(data)),
    demoLogin: () => dispatch(demoLogin())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
