import React from 'react';

class MessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {body:"", channel_id: 1};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
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

  handleSubmit(e){
    e.preventDefault();
    this.props.createMessage({message: this.state});
    this.setState({body:"", channel_id: 1});
  }
  render(){
    return (<form className="message-form" onSubmit={this.handleSubmit}>
      <label htmlFor="msg-body"></label>
      {/* <input id='msg-body' type='text' onChange={this.handleChange('body')} value={this.state.body} placeholder="New Message"/> */}
      <textarea id='msg-body' type='text' onChange={this.handleChange('body')} value={this.state.body} onKeyPress={this.handleEnter} placeholder="New Message"></textarea>
    </form>);
  }
}

export default MessageForm;
