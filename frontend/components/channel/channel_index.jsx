/*globals Pusher*/
import React from 'react';
import ChannelList from './channel_list.jsx';
import Spinner from 'react-spinkit';
import {withRouter} from 'react-router';
import ChannelFormContainer from './channel_form_container.jsx';
import Modal from 'react-modal';
import Collapsible from 'react-collapsible';

class ChannelIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {modalOpen: false, formType: "", selectChannelId: 1};
    this.closeModal = this.closeModal.bind(this);
    // this.openModal = this.openModal.bind(this);
    this.addClick = this.addClick.bind(this);
    this.selectChannel = this.selectChannel.bind(this);
  }
  closeModal(){
    this.setState({modalOpen: false, formType: ""});
  }

  openForm(formType){
    this.setState({modalOpen: true, formType });
  }

  componentDidMount(){
    console.log('channel will mount');
    this.props.fetchSubChannels();
    this.props.fetchPrivateChannels();
    if(!window.myPusherApp){
      window.myPusherApp = new Pusher(window.myPusherK, {
        encrypted: true
      });
    }
  }

  selectChannel(id){
    this.setState({selectChannelId: id});
  }

  componentWillReceiveProps(newProps){
    // debugger
  }

  addClick(formType){
    return (e) =>{
      e.preventDefault();
      this.openForm(formType);
    };
  }

  render() {
    let channelLis = (<li>Channel List</li>);
    let privateLis = (<li>Private Channel List</li>);
    let keys = Object.keys(this.props.channels);
    let privateKeys = Object.keys(this.props.privateChannels);
    if(keys.length && privateKeys.length){
      channelLis = keys.map(key=>{
        let active = this.state.selectChannelId === this.props.channels[key].id ? true : false;
        return (
            <ChannelList channel={this.props.channels[key]} key={key + this.props.channels[key].name} onClick={this.selectChannel} active={active}/>
        );
      });

      privateLis = privateKeys.map(key=>{
        let active = this.state.selectChannelId === this.props.privateChannels[key].id ? true : false;
        return (
            <ChannelList channel={this.props.privateChannels[key]} key={key + this.props.privateChannels[key].name} onClick={this.selectChannel} active={active}/>
        );
      });
    } else {
      channelLis = (
        <Spinner spinnerName="rotating-plane" className="spinner-rotating-plane"/>
      );
    }

    const openArrow = (
      <i class="material-icons">keyboard_arrow_down</i>
    );
    const closeArrow = (
      <i class="material-icons">keyboard_arrow_up</i>
    );
    return(
      <div className="channel-sidebar">

         <Collapsible trigger={`CHANNELS`} classParentString="pub-channels-options" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
         triggerWhenOpen={`CHANNELS`} open={true}>
         {/* <section className="pub-channels-options">
        </section> */}
        <section className="public-channel-box">
          <ul className="pub-channel-lis">
          {channelLis}
          </ul>
        </section>
         </Collapsible>
         <button className="add-pub-channel-icon"><i className="material-icons add-ch-button" onClick={this.addClick("PUB")}>playlist_add</i></button>
         <ChannelFormContainer open={this.state.modalOpen} close={this.closeModal} />







         <Collapsible trigger={`DIRECT MESSAGES`} classParentString="pub-channels-options" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
         triggerWhenOpen={`DIRECT MESSAGES`} open={true}>
        <section className="public-channel-box">
          <ul className="pub-channel-lis">
          {privateLis}
          </ul>
        </section>
         </Collapsible>
         <button className="add-pub-channel-icon"><i className="material-icons add-ch-button" onClick={this.addClick("PUB")}>playlist_add</i></button>
         <ChannelFormContainer open={this.state.modalOpen} close={this.closeModal} />
      </div>
    );
  }
}

export default withRouter(ChannelIndex);

/*<Loading type='balls' color='#989595' />*/
