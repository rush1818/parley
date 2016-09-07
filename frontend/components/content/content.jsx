import React from 'react';
import MessageIndexContainer from '../message/message_index_container.jsx';
import ChannelIndexContainer from '../channel/channel_index_container.jsx';

class Content extends React.Component {
  render() {
    return (
      <section className="main-content group">
        <section className="channel-index">
          <ChannelIndexContainer />
        </section>
        {this.props.children}
      </section>
    );
  }
}

export default Content;
