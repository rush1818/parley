import React from 'react';

class MessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {body:"", errors:"", channelName: this.props.channelName, channelId: this.props.channelId};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({channelName: newProps.channelName, channelId: newProps.channelId});
  }

  handleChange(field){
    return (e) =>{
      e.preventDefault();
      this.setState({[field]: e.target.value});
    };
  }

  handleEnter(e){
    if (e.key === "Enter"){
      this.handleSubmit(e);
    }
  }
  handleEmptyMsg(){
    const that = this;
    this.setState({errors: "Hey, enter some text!"});
    setTimeout(()=>{
      this.setState({errors: ""});
    }, 2000);
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.body.length > 0) {
      this.props.createMessage(this.state.channelId, {message: {body: this.state.body}});
      this.setState({body:""});
      setTimeout(()=>{
        let messageList = document.getElementById("message-list-data");
        messageList.scrollTop = messageList.scrollHeight;
      },50);
    } else {
      this.handleEmptyMsg();
    }
  }
  render(){
    return (<form className="message-form" onSubmit={this.handleSubmit}>
      <label htmlFor="msg-body"></label>
      <textarea id='msg-body' type='text' onChange={this.handleChange('body')} value={this.state.body} onKeyPress={this.handleEnter} placeholder={this.state.errors.length ? this.state.errors : `Message #${this.state.channelName}`}></textarea>
    </form>);
  }
}

export default MessageForm;
