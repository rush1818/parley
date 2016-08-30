import React from 'react';

const MessageList = ({messages}) => {
  let messageKeys = Object.keys(messages);
  let content = messageKeys.map(key=>{
    let message = messages[key];
    return (
      <li key={`${key} ${message.date}`}>{message.body} <span className='message-date'>{message.date}</span></li>
    );
  });
  return (
    <div>
    {content}
    </div>
  );
};

export default MessageList;
