import React, {Component} from 'react'
import ChatMessage from './ChatMessage'

export default class ChatHistory extends Component {
  render() {
    const {messages} = this.props

    return (
      <div>
        {messages.map(({text, user}, i) =>
          <ChatMessage key={i} message={text} author={user.nickname}/>
        )}
      </div>
    )
  }
}
