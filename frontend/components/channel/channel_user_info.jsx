import React from 'react';

class ChannelUserInfo extends React.Component {
  render() {
    return(
      <ul>
      {this.props.userNames}
      </ul>
    );
  }
}

export default ChannelUserInfo;
