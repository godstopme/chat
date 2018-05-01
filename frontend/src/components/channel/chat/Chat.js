import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Grid, Row, Col} from 'react-bootstrap'

import ChatHistory from './ChatHistory'
import ChatUserBlock from './ChatUserBlock'

import {sendMessage} from '../../../actions/ChatRoom'
import {connectUserToChatRoom} from '../../../actions/ChatRoom'

class Chat extends Component {
  componentDidMount() {
    const {user, connectUserToChatRoom} = this.props

    connectUserToChatRoom({user, chatRoom: 'main'})
  }

  render() {
    const {user, socket, messages} = this.props

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <ChatHistory user={user} socket={socket} messages={messages} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ChatUserBlock
              user={user} socket={socket}
              onUserInput={(message) => sendMessage(socket, {...message, user})}
            />
          </Col>
        </Row>
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

const mapDispatchToProps = dispatch => ({
  connectUser: connectUserToChatRoom
})

export default connect(mapStateToProps, {connectUserToChatRoom})(Chat)