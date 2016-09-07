import React from 'react';
import { hashHistory, withRouter } from 'react-router';

class ChannelList extends React.Component {
  constructor(props){
    super(props);
    this.handleChannelClick = this.handleChannelClick.bind(this);
  }

  handleChannelClick(e){
    e.preventDefault();
    this.props.router.push(`channels/${this.props.channel.name}?${this.props.channel.id}`);
    this.props.onClick(this.props.channel.id);
  }

  render() {
    return(
      <li onClick={this.handleChannelClick} className={this.props.active ? "selected-channel" : "not-selected-channel"}>
        {this.props.channel.name}
      </li>
    );
  }
}

export default withRouter(ChannelList);
