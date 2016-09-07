import { connect } from 'react-redux';
import ChannelForm from './channel_form.jsx';
import {createPubChannel, createPrivateChannel} from '../../actions/channel_actions.js';

const mapStateToProps = (state, ownProps) => {
  return({
    formType: ownProps.formType,
    userList: state.users.savedUsersList,
    open: ownProps.open,
    close: ownProps.close,
    channelFeed: state.channelFeed
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createPubChannel: (channel) => dispatch(createPubChannel(channel)),
    createPrivateChannel: (channel) => dispatch(createPrivateChannel(channel))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
