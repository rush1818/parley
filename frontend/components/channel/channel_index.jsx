import React from 'react';
import ChannelList from './channel_list.jsx';

class ChannelIndex extends React.Component {
  constructor(props){
    super(props);
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    console.log('channel will mount');
    this.props.fetchSubChannels();
  }

  render() {
    let channelLis = (<li>Channel List</li>);
    let keys = Object.keys(this.props.channels);
    if(keys.length){
      channelLis = keys.map(key=>{
        return (<ChannelList channel={this.props.channels[key]} key={key + this.props.channels[key].name}/>);
      });
    }
    return(
      <div>
        <ul>
          {channelLis}
        </ul>
      </div>
    );
  }
}

export default ChannelIndex;
