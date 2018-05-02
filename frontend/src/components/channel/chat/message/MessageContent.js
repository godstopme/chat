import React, {Component} from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

const ContentHeader = (props) =>
  <Grid item>
    <Typography variant="title" align="left">
      Message content header
    </Typography>
    <Typography variant="subheading" align="left">
      14:22
    </Typography>
  </Grid>

export default class MessageContent extends Component {
  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container>
            <ContentHeader/>
          </Grid>
        </Grid>
        <Grid item>
          <p>Message content</p>
        </Grid>
      </Grid>
    )
  }
}