/*globals Pusher*/
import React from 'react';
import ChannelList from './channel_list.jsx';
import Spinner from 'react-spinkit';
import {withRouter} from 'react-router';

class ChannelIndex extends React.Component {
  constructor(props){
    super(props);
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    console.log('channel will mount');
    this.props.fetchSubChannels();
    if(!window.myPusherApp){
      window.myPusherApp = new Pusher(window.myPusherK, {
        encrypted: true
      });
    }
  }

  render() {
    let channelLis = (<li>Channel List</li>);
    let keys = Object.keys(this.props.channels);
    if(keys.length){
      channelLis = keys.map(key=>{
        return (
            <ChannelList channel={this.props.channels[key]} key={key + this.props.channels[key].name}/>
        );
      });
    } else {
      channelLis = (
        <Spinner spinnerName="rotating-plane" className="spinner-rotating-plane"/>
      );
    }
    return(
      <div>
      <section className="pub-channels-options">
        <h2>Channels</h2>
        <button className="add-pub-channel-icon"><i className="material-icons add-ch-button">playlist_add</i></button>
      </section>
      <section className="public-channel-box">
        <ul className="pub-channel-lis">
        {channelLis}
        </ul>
      </section>
      </div>
    );
  }
}

export default withRouter(ChannelIndex);

/*<Loading type='balls' color='#989595' />*/
