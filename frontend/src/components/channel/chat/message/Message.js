import React, {Component} from 'react'
import Typography from 'material-ui/Typography'
import {CardContent, CardHeader, CardActions} from 'material-ui/Card'
import Avatar from '../../../common/user/Avatar'
import MessageContent from './MessageContent'
import {MoreHorizontalIcon} from '../../../common/Icons'
import styled from 'styled-components'
import {Paper} from '../../../common/blocks'


export default class Message extends Component {
  render() {
    const {message, author} = this.props

    return (
      <Paper>
        <Avatar>R T</Avatar>
        <MessageContent/>
      </Paper>
    )
  }
}
