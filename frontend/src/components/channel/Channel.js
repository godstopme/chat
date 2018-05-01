import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Grid, Row, Col} from 'react-bootstrap'

import ChannelHeader from './ChannelHeader'
import ChannelInfo from './ChannelInfo'
import Chat from './chat'

import {sendMessage} from '../../actions/ChatRoom'
import {connectUserToChatRoom} from '../../actions/ChatRoom'

class ChatRoom extends Component {
  componentDidMount() {
    const {user, connectUserToChatRoom} = this.props

    connectUserToChatRoom({user, chatRoom: 'main'})
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <ChannelHeader/>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Chat/>
          </Col>
          <Col xs={4}>
            <ChannelInfo/>
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

export default connect(mapStateToProps, {connectUserToChatRoom})(ChatRoom)