import { connect } from 'react-redux';
import UserList from './user_list.jsx';
import {requestUsers} from '../../actions/user_actions.js';

const mapStateToProps = (state, ownProps) => {
  if (state.session.currentUser) {
    return({
      userList: state.users.arrayUsers
    });
  } else {
    return({});
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchUsers: () => dispatch(requestUsers())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
