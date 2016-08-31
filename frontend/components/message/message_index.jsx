/*globals Pusher*/
import React from 'react';
import MessageList from './message_list.jsx';
import MessageFormContainer from './message_form_container.jsx';

class MessageIndex extends React.Component {
  constructor(props){
    super(props);
    this.fetchMore = this.fetchMore.bind(this);
  }

  fetchMore (){
    let oldDate = this.props.messages.date.toUTCString();
    this.props.fetchMessages(oldDate);
  }

  componentDidMount(){
    this.props.fetchUsers();

    let that = this;
    this.pusher = new Pusher(window.myPusherK, {
      encrypted: true
    });

    var channel = this.pusher.subscribe('messages');
    channel.bind('new_message', function(data) {
      that.props.fetchMessages();
    });

    channel.bind('message_deleted', function(data) {
      that.props.removeMessageFromStore(data.id);
    });
    this.props.fetchMessages();

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

  componentWillUnmount(){
    const that = this;
    this.pusher.unsubscribe('messages');
    clearInterval(that.autoFetch);
  }

  render() {
    return(
      <section className='message-index'>
        <h2>Message Index Component Goes Here</h2>
        <MessageList messages={this.props.messages} currentUser={this.props.currentUser} removeMessage={this.props.removeMessage} users={this.props.users}/>
        <MessageFormContainer />
      </section>
    );
  }
}

export default MessageIndex;
