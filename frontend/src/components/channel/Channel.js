import React, {Component} from 'react'
import {connect} from 'react-redux'

// import {Grid, Row, Col} from 'react-bootstrap'
import Grid from 'material-ui/Grid'

import ChannelHeader from './ChannelHeader'
import ChannelInfo from './ChannelInfo'
import Chat from './chat'

import {sendMessage} from '../../actions/ChatRoom'
import {connectUserToChatRoom} from '../../actions/ChatRoom'
import styled from 'styled-components'

const Container = styled(Grid).attrs({
  container: true,
  justify: 'center',
})`
  && {
    margin: 0 auto;
    max-width: 1200px;
  }
`

class Channel extends Component {
  componentDidMount() {
    const {user, connectUserToChatRoom} = this.props

    // connectUserToChatRoom({user, chatRoom: 'main'})
  }

  render() {
    return (
      <Container>
        <Grid item xs={12}>
          <ChannelHeader/>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Chat/>
          </Grid>
          <Grid item xs={4}>
            <ChannelInfo/>
          </Grid>
        </Grid>
      </Container>
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

// export default connect(mapStateToProps, {connectUserToChatRoom})(Channel)
export default Channel