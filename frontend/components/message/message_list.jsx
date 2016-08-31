import React from 'react';

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(id) {
    return (e) =>{
      e.preventDefault();
      this.props.removeMessage(id);
    };
  }

  render(){
    let messageKeys = Object.keys(this.props.messages);
    let content = messageKeys.map(key=>{
      let button=(<span></span>);
      if (key === 'date') {return;}
      let message = this.props.messages[key];
      if (this.props.currentUserId === this.props.messages[key].user_id){
        button = (
          <button className="msg-delete-button" onClick={this.handleDelete(this.props.messages[key].id)}>Delete</button>
        );
      }
      return (
        <li className="msg-list-item group" key={`${key} ${message.date}`}><span className="message-info group"><span className='message-date'>{message.date}</span>{button}</span>{message.body}</li>
      );
    });
    return (
      <section id="message-list-data" className="message-list-data">
      {content}
      </section>
    );
  }
}

export default MessageList;
