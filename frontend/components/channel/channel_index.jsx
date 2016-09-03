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
    this.state = {modalOpen: false, formType: ""};
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addClick = this.addClick.bind(this);
  }
  closeModal(){
    this.setState({modalOpen: false, formType: ""});
  }

  openModal(formType){
    this.setState({modalOpen: true, formType });
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

  addClick(formType){
    return (e) =>{
      e.preventDefault();
      this.openModal(formType);
    };
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

    const openArrow = (
      <i class="material-icons">keyboard_arrow_down</i>
    )
    const closeArrow = (
      <i class="material-icons">keyboard_arrow_up</i>
    )
    return(
      <div className="channel-sidebar">

         <Collapsible trigger={`CHANNELS`} classParentString="pub-channels-options" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
         triggerWhenOpen={`CHANNELS`}>
         {/* <section className="pub-channels-options">
        </section> */}
        <section className="public-channel-box">
          <ul className="pub-channel-lis">
          {channelLis}
          </ul>
        </section>
         </Collapsible>
         <button className="add-pub-channel-icon"><i className="material-icons add-ch-button" onClick={this.addClick("PUB")}>playlist_add</i></button>
          <section>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}
            closeTimeoutMS={5}>
            <ChannelFormContainer formType={this.state.formType}/>
          </Modal>
        </section>
      </div>
    );
  }
}

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(32,36,38, 0.60)'  //Same as style.css in hex color is #202426
  },
  content: {
    position: 'fixed',
    top: '100px',
    left: '150px',
    right: '150px',
    bottom: '100px',
    // border: '1px solid #ccc',
    padding: '20px',
    background: 'rgba(255,255,255,.9)',
    width: '400px',
    height: '300px',
    margin: '0 auto',
    // borderRadius: '10%'

  }
};

export default withRouter(ChannelIndex);

/*<Loading type='balls' color='#989595' />*/
