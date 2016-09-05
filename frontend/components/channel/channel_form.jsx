import React from 'react';
import UserListContainer from '../user/user_list_container.jsx';
import {withRouter} from 'react-router';
import Modal from 'react-modal';

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
};

class ChannelForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  handleChange(field){
    return ((e) =>{
      e.preventDefault();
      this.setState({[field]: e.target.value});
    });
  }

  handleSubmit(e){
    e.preventDefault();
    let channelName = this.state.name;
    let selectedUsers = this.props.userList;
    let subscriber_ids = [];
    if (selectedUsers){
        subscriber_ids = selectedUsers.map(user=>{
        return user.id;
      });
    }
    subscriber_ids = subscriber_ids.getUnique();
    this.props.createPubChannel({name: channelName, subscriber_ids: subscriber_ids });
    this.setState({name: ""});
    this.props.close();
  }

  modalClose(){
    return ((e)=>{
      console.log(this.props.formType);
      this.props.close();
      this.setState({name: ""});
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.modalClose()}
        style={modalStyle}
        closeTimeoutMS={5}>
    <form className="channel-form" onSubmit={this.handleSubmit}>
        <label htmlFor="channelName">Channel Name</label>
        <input id="channelName"className="channel-name-input" type="text" onChange={this.handleChange("name")} value={this.state.name} placeholder="Name"/>

        <UserListContainer />

        {/* <ul className="user-name-result-box">
        <li>
        Results
        </li>
        </ul> */}
      <button>Create</button>
    </form>
    </Modal>
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

export default withRouter(ChannelForm);
