import React, {Component} from 'react'
import ChatMessage from './message/Message'
import Grid from 'material-ui/Grid'

export default class ChatHistory extends Component {
  render() {
    const {messages} = this.props

    return (
      <Grid container direction="column">
        <Grid item xs={12}>
          <ChatMessage/>
        </Grid>
        <Grid item xs={12}>
          <ChatMessage/>
        </Grid>
      </Grid>
    )
  }
}
