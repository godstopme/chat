import React, {Component} from 'react'
import Grid from 'material-ui/Grid'

export default class MessageContent extends Component {
  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          <h1>Message content header</h1>
        </Grid>
        <Grid item>
          <p>Message content</p>
        </Grid>
      </Grid>
    )
  }
}