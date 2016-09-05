import { connect } from 'react-redux';
import ChannelForm from './channel_form.jsx';
import {createPubChannel, createPrivateChannel} from '../../actions/channel_actions.js';

const mapStateToProps = (state, ownProps) => {
  return({
    formType: ownProps.formType,
    userList: state.users.savedUsersList,
    open: ownProps.open,
    close: ownProps.close
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    //Add create channel actions.
    createPubChannel: (channel) => dispatch(createPubChannel(channel)),
    createPrivateChannel: (channel) => dispatch(createPrivateChannel(channel))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
