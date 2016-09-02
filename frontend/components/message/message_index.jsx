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

  }

  fetchMore (){
    let oldDate = this.props.messages.date.toUTCString();
    let channelId = this.state.channelId;
    this.props.fetchMessages(FETCH_CONDITIONS.ALL_MESSAGES , channelId, oldDate);
  }

  componentWillReceiveProps(newProps){
    // this.setState({channelId: newProps.channelId, channelName: newProps.channelName });
  }

  componentDidMount(){
    console.log('index mounted');
    if (this.state.channelName){
      // this.props.fetchMessages(FETCH_CONDITIONS.FIRST_FETCH, this.state.channelId);
      this.props.fetchUsers();

      let that = this;
      this.pusher = new Pusher(window.myPusherK, {
        encrypted: true
      });

      var channel = this.pusher.subscribe('messages');
      channel.bind('new_message', function(data) {
        that.props.fetchMessages(FETCH_CONDITIONS.NEW_MESSAGE, that.state.channelId);
      });

      channel.bind('message_deleted', function(data) {
        that.props.removeMessageFromStore(data.id);
      });

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
  }

  componentWillUnmount(){
    console.log("msg index unmounted!");
    const that = this;
    this.pusher.unsubscribe('messages');
    clearInterval(that.autoFetch);
  }

  render() {
    return(
      <section className="message-list-container group">
        <MessageList messages={this.props.messages} currentUser={this.props.currentUser} removeMessage={this.props.removeMessage} users={this.props.users}/>
        <MessageFormContainer />
      </section>
    );
  }
}

export default withRouter(MessageIndex);
