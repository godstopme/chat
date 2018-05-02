import React, {Component} from 'react'
import ChatMessage from './message/Message'
import Grid from 'material-ui/Grid'

export default class ChatHistory extends Component {
  render() {
    const {messages} = this.props

    return (
      <Grid container direction="column" spacing={8}>
        {/*{messages.map(({text, user}, i) =>*/}
          {/*<Grid item xs={12} key={i}>*/}
            {/*<ChatMessage message={text} author={user.nickname}/>*/}
          {/*</Grid>*/}
        {/*)}*/}
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
