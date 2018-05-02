import React, {Component} from 'react'
import Grid from 'material-ui/Grid'
import Avatar from '../../../common/user/Avatar'
import MessageContent from './MessageContent'

export default class Message extends Component {
  render() {
    const {message, author} = this.props

    return (
      <Grid container>
        <Grid item xs={2}>
          <Avatar/>
        </Grid>
        <Grid item xs={10}>
          <MessageContent/>
        </Grid>
      </Grid>
    )
  }
}
