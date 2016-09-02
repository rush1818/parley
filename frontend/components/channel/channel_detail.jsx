import React from 'react';
import MessageIndexContainer from '../message/message_index_container.jsx';

class ChannelDetail extends React.Component {
  constructor(props){
    super(props);
    this.channelId = this.props.location.search.slice(1);
    this.channelName = this.props.params.channel_name;
  }
  render() {
    return(
      <section className='message-index'>
        <section className='message-index-info'>
          ChannelInfoGoesHere
        </section>
        <MessageIndexContainer channelId={this.channelId} channelName={this.channelName} />
      </section>
    );
  }
}

export default ChannelDetail;
