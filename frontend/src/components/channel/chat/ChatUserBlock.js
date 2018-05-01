import React, {Component} from 'react'
import {Button, Form} from 'react-bootstrap'
import {FormControl, FormGroup} from 'react-bootstrap'

export default class ChatUserBlock extends Component {
  constructor(props) {
    super(props)

    this.userInputHandler = this.userInputHandler.bind(this)
  }

  userInputHandler(e) {
    if (e.key === 'Enter' && this.input.value) {
      const {socket, onUserInput} = this.props
      console.log('on user input', onUserInput)
      onUserInput({message: this.input.value})
    }
  }

  render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <FormControl type="text"
                       inputRef={ref => this.input = ref }
                       placeholder="Напишите сообщение..."
                       autoFocus={true}
                       onKeyPress={this.userInputHandler}
          />
          {/*<Button onClick={this.userInputHandler} type="submit"/>*/}
        </FormGroup>
      </Form>
    )
  }
}