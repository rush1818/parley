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
    let that = this;
    this.pusher = new Pusher(window.myPusherK, {
      encrypted: true
    });

    var channel = this.pusher.subscribe('messages');
      channel.bind('new_message', function(data) {
        that.props.fetchMessages();
    });
    this.props.fetchMessages();
    setTimeout(()=>{
      let messageList = document.getElementById("message-list-data");
      messageList.scrollTop = messageList.scrollHeight;
    },200);
  }

  componentWillUpdate(){

  }

  componentWillMount(){

  }

  componentWillUnmount(){
    this.pusher.unsubscribe('messages');
  }

  render() {
    return(
      <section className='message-index'>
        <h2>Message Index Component Goes Here</h2>
        <h2 onClick={this.fetchMore}>FETCH MORE</h2>
        <MessageList messages={this.props.messages} />
        <MessageFormContainer />
      </section>
    );
  }
}

export default MessageIndex;
