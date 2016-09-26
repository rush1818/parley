import React from 'react';
import MessageIndexContainer from '../message/message_index_container.jsx';
import ChannelUserInfo from './channel_user_info.jsx';
import Modal from 'react-modal';

const PERMANENT_CHANNELS = ["general", "bot"];

class ChannelDetail extends React.Component {
  constructor(props){
    super(props);
    this.channelId = this.props.location.search.slice(1);
    this.channelName = this.props.params.channel_name;
    this.state = {channelId:this.props.location.search.slice(1), channelName: this.props.params.channel_name, channelUsers: false , modalOpen: false };
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal(){
    this.setState({modalOpen: false});
  }

  openModal(){
    this.setState({modalOpen: true});
  }

  handleClick(e){
    e.preventDefault();
    this.props.unsubscribeChannel(this.state.channelId);
  }


  componentWillReceiveProps(newProps){
    let channelId = newProps.location.search.slice(1);
    let channelUsers = false;
    if ( newProps.state.privateChannels[channelId] && newProps.state.privateChannels[channelId].users){
      channelUsers = newProps.state.privateChannels[channelId].users;
  } else if (newProps.state.channels[channelId]) {
    channelUsers = newProps.state.channels[channelId].users;
  }
    this.setState({channelId, channelName: newProps.params.channel_name, channelUsers});
  }

  render() {
    let userNames = [];
    let userCount = 0;
    const that = this;
    if (that.state.channelUsers){
      that.state.channelUsers.forEach((user, id) => {
        userCount++;
        userNames.push(<li key={user.username}>{user.username}</li>);
      });
    }
    let button = (<button className="remove-channel-button tooltip"onClick={this.handleClick}><i className="material-icons remove-channel-icon">indeterminate_check_box</i><span className="tooltiptext">Leave Channel</span></button>);

    if (PERMANENT_CHANNELS.includes(this.state.channelName)){
      button = (<span></span>);
    }

    return(
      <section className='message-index'>
        <section className='message-index-info group'>
          <h3 className="channel-title">#{this.state.channelName}</h3>
            {button}
            <span onClick={this.openModal} className='channel-member-count'>{userCount > 1 ? `${userCount} members` : `${userCount} member`}</span>
            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.closeModal}
              style={modalStyle}
              closeTimeoutMS={5}>
              <ChannelUserInfo userNames={userNames} />
            </Modal>
        </section>
        <MessageIndexContainer channelId={this.state.channelId} channelName={this.state.channelName} />
      </section>
    );
  }
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(32,36,38, 0.60)' , //Same as style.css in hex color is #202426
    backgroundColor: 'rgba(73,73,73,.6)'
  },
  content: {
    position: 'fixed',
    top: '100px',
    left: '150px',
    right: '150px',
    bottom: '100px',
    // border: '1px solid #ccc',
    padding: '20px',
    background: 'rgba(255,255,255,.9)',
    width: '400px',
    height: '300px',
    margin: '0 auto',
    // borderRadius: '10%'

  }
};
export default ChannelDetail;
