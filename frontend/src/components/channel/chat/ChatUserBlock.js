import React, {Component} from 'react'
import Input from 'material-ui/Input'
import styled from 'styled-components'

const StyledInput = styled(Input).attrs({
  fullWidth: true,
  autoFocus: true,
  placeholder: 'Type a message...',
  name: 'message'
})`
  && {
    &:after, &:before {
      display: none;
    }
  }
`



export default class ChatUserBlock extends Component {
  constructor(props) {
    super(props)

    this.userInputHandler = this.userInputHandler.bind(this)
  }

  userInputHandler(e) {
    if (e.key === 'Enter' && this.userMessageInput.value) {
      const {socket, onUserInput} = this.props

      onUserInput({message: this.userMessageInput.value})
    }
  }

  render() {
    return (
      <StyledInput
        inputRef={(input) => this.userMessageInput = input}
        inputProps={{onKeyPress: this.userInputHandler}}
      />
    )
  }
}