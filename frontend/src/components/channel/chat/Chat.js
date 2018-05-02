import React, {Component} from 'react'
import {connect} from 'react-redux'

// import {Grid, Row, Col} from 'react-bootstrap'
import Grid from 'material-ui/Grid'
import ChatHistory from './ChatHistory'
import ChatUserBlock from './ChatUserBlock'

import {sendMessage} from '../../../actions/ChatRoom'

class Chat extends Component {
  componentDidMount() {
    const {user, connectUserToChatRoom} = this.props

    // connectUserToChatRoom({user, chatRoom: 'main'})
  }

  render() {
    const {user, socket, messages} = this.props

    return (
      <Grid container>
        <Grid item xs={12}>
          <ChatHistory user={user} socket={socket} messages={messages} />
        </Grid>
        <Grid item xs={12}>
          <ChatUserBlock
            user={user} socket={socket}
            onUserInput={(message) => sendMessage(socket, {...message, user})}
          />
        </Grid>
      </Grid>
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

// const mapDispatchToProps = dispatch => ({
//   connectUser: connectUserToChatRoom
// })

export default connect(mapStateToProps)(Chat)