import React from 'react';
import MessageIndexContainer from '../message/message_index_container.jsx';

class Content extends React.Component {
  render() {
    return (
      <section className="main-content">
        <section>
        <h1>Main Content Goes Here</h1>
        <secion className="channel-index"></secion>
        <MessageIndexContainer />
        </section>
      </section>
    );
  }
}

export default Content;
