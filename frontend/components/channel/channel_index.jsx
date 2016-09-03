/*globals Pusher*/
import React from 'react';
import ChannelList from './channel_list.jsx';
import Spinner from 'react-spinkit';
import {withRouter} from 'react-router';
import ChannelFormContainer from './channel_form_container.jsx';
import Modal from 'react-modal';


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
    return(
      <div>
        <section className="pub-channels-options">
          <h2>CHANNELS</h2>
          <button className="add-pub-channel-icon"><i className="material-icons add-ch-button" onClick={this.addClick("PUB")}>playlist_add</i></button>
        </section>
        <section className="public-channel-box">
          <ul className="pub-channel-lis">
          {channelLis}
          </ul>
        </section>
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
