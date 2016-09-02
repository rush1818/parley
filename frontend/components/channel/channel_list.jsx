import React from 'react';
import { hashHistory, withRouter } from 'react-router';

class ChannelList extends React.Component {
  constructor(props){
    super(props);
    this.handleChannelClick = this.handleChannelClick.bind(this);
  }

  handleChannelClick(e){
    // debugger
    e.preventDefault();
    // this.props.router.push(`channels/${this.props.channel.name}`);
  }

  render() {
    return(
      <li onClick={this.handleChannelClick}>
        {this.props.channel.name}
      </li>
    );
  }
}

export default withRouter(ChannelList);
