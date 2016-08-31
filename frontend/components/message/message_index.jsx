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

  }

  componentWillUpdate(){
    console.log('updated');
    const that = this;
    setTimeout(()=>{
      const autoFetch = window.setInterval(()=>{
        if (!that.props.messages.limit) {
          let messageList = document.getElementById("message-list-data");
          if (messageList.scrollTop === 0){
            that.fetchMore();
          }
        } else {
          clearInterval(autoFetch);
        }
      }, 500);
    }, 100);
  }

  componentWillMount(){

  }
  componentWillReceiveProps(newProps){

  }

  componentWillUnmount(){
    this.pusher.unsubscribe('messages');
  }

  render() {
    let fetch = <h2></h2>;
    if (!this.props.messages.limit) {
      fetch = <h2 onClick={this.fetchMore}>FETCH MORE</h2>;
    }
    return(
      <section className='message-index'>
        <h2>Message Index Component Goes Here</h2>
          {fetch}
        <MessageList messages={this.props.messages} currentUserId={this.props.currentUserId} removeMessage={this.props.removeMessage} />
        <MessageFormContainer />
      </section>
    );
  }
}

export default MessageIndex;
