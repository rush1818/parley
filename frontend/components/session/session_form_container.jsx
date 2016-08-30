import { connect } from 'react-redux';
import SessionForm from './session_form.jsx';
import {login, signup} from '../../actions/session_actions.js';

const mapStateToProps = (state, ownProps) => ({
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    login: (data) => dispatch(login(data)),
    signup: (data) => dispatch(signup(data))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
