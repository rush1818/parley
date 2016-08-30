import React from 'react';
import MessageList from './message_list.jsx';

class MessageIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchMessages();
  }
  render() {
    return(
      <section className='message-index'>
        <h2>Message Index Component Goes Here</h2>
        <MessageList messages={this.props.messages} />
      </section>
    );
  }
}

export default MessageIndex;
