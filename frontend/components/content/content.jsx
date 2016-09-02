import React from 'react';
import MessageIndexContainer from '../message/message_index_container.jsx';
import ChannelIndexContainer from '../channel/channel_index_container.jsx';

class Content extends React.Component {
  render() {
    return (
      <section className="main-content group">
      <div className="main-content-back" >
        {/* <img className="splash-img" src={window.myBackgroundPath} alt="parley" /> */}
      </div>
        <section>
        <secion className="channel-index">
          <ChannelIndexContainer />
        </secion>
        {this.props.children}
        </section>
      </section>
    );
  }
}

export default Content;
