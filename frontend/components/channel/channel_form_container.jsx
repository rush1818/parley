import { connect } from 'react-redux';
import ChannelForm from './channel_form.jsx';
import {createPubChannel} from '../../actions/channel_actions.js';

const mapStateToProps = (state, ownProps) => {
  return({
    formType: ownProps.formType
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    //Add create channel actions.
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
