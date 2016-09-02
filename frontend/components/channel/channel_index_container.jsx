import { connect } from 'react-redux';
import ChannelIndex from './channel_index.jsx';
import {requestSubChannels} from '../../actions/channel_actions.js';

const mapStateToProps = (state, ownProps) => {
  return({
    channels: state.channels
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchSubChannels: () => dispatch(requestSubChannels())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex);
