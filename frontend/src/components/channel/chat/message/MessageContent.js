import React, {Component} from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import styled from 'styled-components'
import {Paper} from '../../../common/blocks'

const MessageTime = styled('span')`
  font-weight: 300;
  color: #aaaaaa;
  font-size: 1rem;
`
const MessageContentHeader = (props) =>
  <Typography variant="title" align="left">
    Message content header <MessageTime>14:22</MessageTime>
  </Typography>

const MessageText = (props) =>
  <Typography component="p" gutterBottom>
    Message contentMessage contentMessage contentMessage contentMessage contentMessage content
    Message contentMessage contentMessageasdf contentMessageasdf contentMessage contentMessage contentfsdf
    Message contentMessage contentMessage contentMessage contentMessage contentMessage content
  </Typography>

export default class MessageContent extends Component {
  render() {
    return (
      <Paper column>
        <MessageContentHeader/>
        <MessageText/>
      </Paper>
    )
  }
}