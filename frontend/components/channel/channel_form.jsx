import React from 'react';
import SearchBar from 'react-search-bar';
class ChannelForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field){
    return (e) =>{
      e.preventDefault();
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render() {
    return (
    <form className="channel-form" onSubmit={this.handleSubmit}>
        <label htmlFor="channelName">Channel Name</label>
        <input id="channelName"className="channel-name-input" type="text" onChange={this.handleChange("name")} value={this.state.name} placeholder="Name"/>

        <label htmlFor="user-name-result-box">Usernames</label>
        <input id="usernames" className="user-name-input" type="text" onChange={this.handleChange("username")} value={this.state.name} placeholder="Enter username"/>

        <ul className="user-name-result-box">
        <li>
        Results
        </li>
        </ul>
      <button>Create</button>
    </form>
  );
  }
}

export default ChannelForm;
