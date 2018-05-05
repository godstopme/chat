import React, {Component} from 'react'
import {connect} from 'react-redux'
import Grid from 'material-ui/Grid'
import ChatHistory from './ChatHistory'
import ChatUserBlock from './ChatUserBlock'

import {connectUserToChatRoom} from '../../../actions/channel'
import {sendMessage} from '../../../actions/channel/chat'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const {user, connectUserToChatRoom} = this.props

    connectUserToChatRoom({user, chatRoom: 'main'})
  }

  sendMessage(message) {
    const {user, socket, sendMessage} = this.props

    sendMessage(socket, {...message, user})
  }

  render() {
    const {user, socket, chatHistory} = this.props

    return (
      <Grid container>
        <Grid item xs={12}>
          <ChatHistory user={user} socket={socket} chatHistory={chatHistory} />
        </Grid>
        <Grid item xs={12}>
          <ChatUserBlock user={user} socket={socket} onUserInput={this.sendMessage} />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    socket: state.channel.socket,
    chatHistory: state.chatRoom.chatHistory,
  }
}

export default connect(mapStateToProps, {connectUserToChatRoom, sendMessage})(Chat)