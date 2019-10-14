import React from 'react';

class MessageLog extends React.Component {

  render () {

    let message = this.props.message;

    return (
      <div className={message.type}>
        {message.content ? message.content : ''}
      </div>
    )
  }
}

export default MessageLog
