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
    this.state = {pubModalOpen: false, priModalOpen: false, formType: "", selectChannelId: 1};
    this.closeModal = this.closeModal.bind(this);
    // this.openModal = this.openModal.bind(this);
    this.addClick = this.addClick.bind(this);
    this.selectChannel = this.selectChannel.bind(this);
  }
  closeModal(type){
    return ()=>{
      this.setState({[type]: false, formType: ""});
    };
  }

  openForm(formType){
    if (formType === "priModalOpen"){
      this.setState({priModalOpen: true, formType });
    } else {
      this.props.requestFeedChannels();
      this.setState({pubModalOpen: true, formType });
    }
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
    const that = this;
    const channel = window.myPusherApp.subscribe('channels');
    channel.bind('new_channel', function(data) {
      that.props.fetchSubChannels();
      that.props.fetchPrivateChannels();
    });
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

  componentWillUnmount(){
    window.myPusherApp.unsubscribe('channels');
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

        <section className="pub-channel-container">

         <Collapsible trigger={`${String.fromCharCode(9656)} CHANNELS`} classParentString="pub-channels-options" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
         triggerWhenOpen={`${String.fromCharCode(9662)} CHANNELS`} open={true}>
         {/* <section className="pub-channels-options">
        </section> */}
        <section className="public-channel-box">
          <ul className="pub-channel-lis">
          {channelLis}
          </ul>
        </section>
         </Collapsible>
         <button className="add-pub-channel-icon"><i className="material-icons add-ch-button" onClick={this.addClick("PUB")}>add</i></button>
         <ChannelFormContainer open={this.state.pubModalOpen} close={this.closeModal("pubModalOpen")} formType={this.state.formType}/>

         </section>





         <section className="direct-channel-container">

         <Collapsible trigger={`${String.fromCharCode(9656)} DIRECT MESSAGES`} classParentString="direct-channels-options" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
         triggerWhenOpen={`${String.fromCharCode(9662)} DIRECT MESSAGES`} open={true}>
        <section className="direct-channel-box">
          <ul className="direct-channel-lis">
          {privateLis}
          </ul>
        </section>
         </Collapsible>
         <button className="add-direct-channel-icon"><i className="material-icons add-ch-button" onClick={this.addClick("PRI")}>add</i></button>
         <ChannelFormContainer open={this.state.priModalOpen} close={this.closeModal("priModalOpen")} formType={this.state.formType} />
         </section>

      </div>
    );
  }
}

export default withRouter(ChannelIndex);

/*<Loading type='balls' color='#989595' />*/
