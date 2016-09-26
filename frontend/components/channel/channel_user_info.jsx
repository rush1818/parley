import React from 'react';

class ChannelUserInfo extends React.Component {
  render() {
    return(
      <ul className='channel-member-list group' key='channel-member-list'>
      {this.props.userNames}
      </ul>
    );
  }
}

export default ChannelUserInfo;
