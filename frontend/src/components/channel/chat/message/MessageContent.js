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
const MessageContentHeader = ({nickname, time}) =>
  <Typography variant="title" align="left">
    {nickname} <MessageTime>{time}</MessageTime>
  </Typography>

const MessageText = ({text}) =>
  <Typography component="p" gutterBottom>
    {text}
  </Typography>

export default class MessageContent extends Component {
  render() {
    const {nickname, message} = this.props

    return (
      <Paper column>
        <MessageContentHeader nickname={nickname}/>
        <MessageText text={message}/>
      </Paper>
    )
  }
}