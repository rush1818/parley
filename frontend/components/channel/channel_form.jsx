import React from 'react';
import UserListContainer from '../user/user_list_container.jsx';
import {withRouter} from 'react-router';
import Modal from 'react-modal';
// import ReactTags from 'react-tag-autocomplete';
import Autosuggest from 'react-autosuggest';

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
    this.state = {value: "", tags: [], suggestions: [], allSuggestions: this.props.channelFeed};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalClose = this.modalClose.bind(this);

    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.handleSuggestion = this.handleSuggestion.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({allSuggestions: newProps.channelFeed});
  }
  handleChange(field){
    return ((e) =>{
      e.preventDefault();
      this.setState({[field]: e.target.value});
    });
  }
  getSuggestions(value) {
    // debugger
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.allSuggestions.filter(channel =>
      channel.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  }

  handleSuggestion(event, {newValue}){
    this.setState({
     value: newValue
   });
  }

  handleSubmit(e){
    e.preventDefault();
    let channelName = this.state.value;
    let selectedUsers = this.props.userList;
    let subscriber_ids = [];
    if (selectedUsers){
        subscriber_ids = selectedUsers.map(user=>{
        return user.id;
      });
    }
    subscriber_ids = subscriber_ids.getUnique();
    if (this.props.formType === "PUB"){
      this.props.createPubChannel({name: channelName});
    } else {
      this.props.createPrivateChannel(({name: channelName, subscriber_ids: subscriber_ids }));
    }
    this.setState({value: ""});
    this.props.close();
  }

  modalClose(){
    return ((e)=>{
      // console.log(this.props.formType);
      this.props.close();
      this.setState({value: ""});
    });
  }

  render() {
    let formContent;
    if (this.props.formType === "PRI") {
      formContent = (
        <form className="channel-form" onSubmit={this.handleSubmit}>
            <label htmlFor="channelName">Channel Name</label>
            <input id="channelName"className="channel-name-input" type="text" onChange={this.handleChange("value")} value={this.state.value} placeholder="Name"/>

            <UserListContainer />
          <button className="create-channel-button">Create</button>
        </form>
      );
    } else {
       const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: 'Type a channel name',
        value,
        onChange: this.handleSuggestion
      };
      formContent = (
        <form className="channel-form" onSubmit={this.handleSubmit}>
          <Autosuggest
           suggestions={suggestions}
           onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
           onSuggestionsClearRequested={this.onSuggestionsClearRequested}
           getSuggestionValue={this.getSuggestionValue}
           renderSuggestion={this.renderSuggestion}
           inputProps={inputProps} />
        <button className="create-channel-button">Create/Join Channel</button>
        </form>
      );
    }
    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.modalClose()}
        style={modalStyle}
        closeTimeoutMS={5}>
        {formContent}
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
    height: '250px',
    margin: '0 auto',
    // borderRadius: '10%'

  }
};

export default withRouter(ChannelForm);
