import React, {Component} from 'react'
import ChatMessage from './message/Message'
import Grid from 'material-ui/Grid'

export default class ChatHistory extends Component {
  render() {
    const {chatHistory} = this.props

    return (
      <Grid container direction="column">
        {chatHistory.map(chatMessage =>
          <Grid item xs={12}>
            <ChatMessage user={chatMessage.user} message={chatMessage.content}/>
          </Grid>
        )}
      </Grid>
    )
  }
}
