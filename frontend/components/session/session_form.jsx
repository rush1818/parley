import React from 'react';
import { hashHistory } from 'react-router';

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
}

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {newUser: 'false', username:"", password:"", guest: "false"};
    this.handleChange = this.handleChange.bind(this);
    this.changeSessionType = this.changeSessionType.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
    this.checkValidUsername = this.checkValidUsername.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);

  }
  // componentDidUpdate(){
  //   console.log('session update');
	// 	this.redirectIfLoggedIn();
	// }

  componentWillReceiveProps(newProp){
    // debugger
  }

  redirectIfLoggedIn(){
    if (this.props.currentUser){
      hashHistory.push("/channels");
    }
  }

  componentWillUnmount(){
    if (this.props.currentUser){
      hashHistory.push("/channels");
    }
  }

  changeSessionType(val){
    return (e)=>{
      e.preventDefault();
      this.setState({newUser: val});
    };
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      if(field === 'username'){
        // debugger
        this.checkValidUsername(e.target.value);
      }
      this.setState({[field]: e.target.value});
    };
  }

  checkValidUsername(username){
    return username.match(/^[\S]{6,}$/);
  }

  guestLogin(e){
    e.preventDefault();
    let username="**********";
    let i = 0;
    let that = this;
    this.state.username = "";
    this.state.password = "";
    this.animateTyping = setInterval(() => {
      if (i < username.length) {
        this.setState({username: `${this.state.username}${username[i]}`,
                password: `${this.state.password}${username[i]}`});
        i++;
      } else {
        clearInterval(this.animateTyping);
        that.props.demoLogin();
      }
    }, 100);
  }

  handleFormSubmit(e){
    e.preventDefault();
    let userData = {user: {username: this.state.username, password: this.state.password}};
    if (this.state.newUser === "true") {
      this.props.signup(userData);
    }else{
      this.props.login(userData);
    }
  }
  render() {
    let errorContent;
    if (this.props.errors && this.props.errors.length) {
      // debugger
      errorContent = (
        <li className='user-errors'>{this.props.errors.getUnique().join(", ")}</li>
      );
    }
    let sessionOptions, buttonText;
    if (this.state.newUser==="false"){
      buttonText= "Login";
      sessionOptions = (
        <ul className="session-options group">
          <li className="session-selected">Log In</li>
          <li className="session-notselected hvr-grow" onClick={this.changeSessionType('true')}>Sign Up</li>
          <li className="session-notselected hvr-grow" onClick={this.guestLogin}>Demo</li>
        </ul>
      );
    } else {
      buttonText= "Sign Up";
      sessionOptions = (
        <ul className="session-options group">
          <li className="session-notselected hvr-grow" onClick={this.changeSessionType('false')}>Log In</li>
          <li className="session-selected">Sign Up</li>
          <li className="session-notselected hvr-grow" onClick={this.guestLogin}>Demo</li>
        </ul>
      );
    }
    return (
      <section className="new-session">
        {sessionOptions}
      <form className='session-form' onSubmit={this.handleFormSubmit}>
      {/* <pre>{this.state.newUser}</pre> */}
        <ul>
          {errorContent}
        </ul>
        <label htmlFor="session_username">&nbsp;</label>
        <input id="session_username" type="text" onChange={this.handleChange('username')}
          value={this.state.username} placeholder="Username"/>

        <label htmlFor="session_password">&nbsp;</label>
        <input id="session_password" type="password" placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}/>
          <button>{buttonText}</button>
      </form>
      </section>
    );
  }
}

export default SessionForm;
