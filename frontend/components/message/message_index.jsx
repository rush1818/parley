/*globals Pusher*/
import React from 'react';
import MessageList from './message_list.jsx';
import MessageFormContainer from './message_form_container.jsx';
import {FETCH_CONDITIONS} from '../../actions/message_actions.js';
import {withRouter} from 'react-router';

class MessageIndex extends React.Component {
  constructor(props){
    super(props);
    this.fetchMore = this.fetchMore.bind(this);
    this.state = {channelId: this.props.channelId, channelName: this.props.channelName};
    this._fetchInterval = this._fetchInterval.bind(this);
    this._createPusherChannel = this._createPusherChannel.bind(this);
  }

  fetchMore (){
    let oldDate = this.props.messages.date.toUTCString();
    let channelId = this.state.channelId;
    this.props.fetchMessages(FETCH_CONDITIONS.ALL_MESSAGES , channelId, oldDate);
  }

  componentWillReceiveProps(newProps){
    // console.log(newProps);
    this.setState({channelId: newProps.channelId, channelName: newProps.channelName });
    if(window.myPusherApp) {
      window.myPusherApp.unsubscribe('messages');
      window.myPusherApp.unsubscribe('message_deleted');
      this._createPusherChannel();
    }
    this._fetchInterval();
  }

  componentWillMount(){
    this.props.fetchUsers();
  }
  componentDidMount(){
    console.log('index mounted');
    if (this.state.channelName){
      this.props.fetchUsers();
      this._createPusherChannel();
      this._fetchInterval();
      let body = document.getElementById("body");
      body.scrollTop = 0;
    }
  }

  _fetchInterval () {
    const that = this;
    setTimeout(()=>{
      that.autoFetch = window.setInterval(()=>{
        if (!that.props.messages.limit) {
          setTimeout(()=>{

            let messageList = document.getElementById("message-list-data");
            if (messageList && messageList.scrollTop === 0){
              if (that.props.currentUser){
                that.fetchMore();
              }
            }
          }, 300);
        } else {
          clearInterval(that.autoFetch);
        }
      }, 500);
    }, 100);
  }

  _createPusherChannel(){
    let that = this;

    var channel = window.myPusherApp.subscribe('messages');
    channel.bind('new_message', function(data) {
      that.props.fetchMessages(FETCH_CONDITIONS.NEW_MESSAGE, that.state.channelId);
    });

    channel.bind('message_deleted', function(data) {
      that.props.removeMessageFromStore(data.id);
    });
    window.myPusherApp.connection.bind( 'error', function( err ) {
      if( err.data.code === 4004 ) {
        console.log('>>> Pusher limit detected');
      }
    });
  }


  componentWillUnmount(){
    console.log("msg index unmounted!");
    const that = this;
    window.myPusherApp.unsubscribe('messages');
    window.myPusherApp.unsubscribe('message_deleted');
    clearInterval(that.autoFetch);
  }

  render() {
    console.log(this.state);
    return(
      <section className="message-list-container group">
        <MessageList messages={this.props.messages} currentUser={this.props.currentUser} removeMessage={this.props.removeMessage} users={this.props.users}/>
        <MessageFormContainer channelName={this.state.channelName} channelId={this.state.channelId}/>
      </section>
    );
  }
}

export default withRouter(MessageIndex);
