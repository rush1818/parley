import { connect } from 'react-redux';
import ChannelDetail from './channel_detail.jsx';
import {unsubscribeChannel} from '../../actions/channel_actions.js';

const mapStateToProps = (state, ownProps) => {
  return({
    state: state,
    ownProps: ownProps
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    unsubscribeChannel: (id) => dispatch(unsubscribeChannel(id))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetail);
