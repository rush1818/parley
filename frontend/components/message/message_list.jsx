import React from 'react';

const MessageList = ({messages}) => {
  let messageKeys = Object.keys(messages);
  let content = messageKeys.map(key=>{
    if (key === 'date') {return;}
    let message = messages[key];
    return (
      <li className="msg-list-item group" key={`${key} ${message.date}`}><span className="message-info group"><span className='message-date'>{message.date}</span></span>{message.body}</li>
    );
  });
  return (
    <section id="message-list-data" className="message-list-data">
    {content}
    </section>
  );
};

export default MessageList;
