import React, {Component} from 'react'
import {connect} from 'react-redux'

import ChatHeader from '../components/chat/ChatHeader'
import ChatHistory from '../components/chat/ChatHistory'
import ChatUserBlock from '../components/chat/ChatUserBlock'

import {sendMessage} from '../actions/ChatRoom'
import {connectUserToChatRoom} from '../actions/ChatRoom'

class ChatRoom extends Component {
  componentDidMount() {
    const {user, connectUserToChatRoom} = this.props

    connectUserToChatRoom({user, chatRoom: 'main'})
  }

  render() {
    const {user, socket, messages} = this.props

    return (
      <div>
        <ChatHeader/>
        <ChatHistory user={user} socket={socket} messages={messages}
        />
        <ChatUserBlock user={user} socket={socket}
                       onUserInput={(message) => sendMessage(socket, {...message, user})}/>
      </div>
    )
  }
}

const mapStateToProps = ({chatRoom}) => {
  return {
    user: chatRoom.user,
    socket: chatRoom.socket,
    messages: chatRoom.messages,
  }
}

const mapDispatchToProps = dispatch => ({
  connectUser: connectUserToChatRoom
})

export default connect(mapStateToProps, {connectUserToChatRoom})(ChatRoom)