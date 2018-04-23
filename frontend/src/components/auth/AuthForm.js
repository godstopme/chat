import React, {Component} from 'react'
import {Form, Button, ControlLabel} from 'react-bootstrap'
import FieldGroup, {PasswordFieldGroup} from '../common/forms/FieldGroup'

const submitForm = e => {
  e.preventDefault()

}

export default class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(e) {
    const {onSubmit} = this.props

    e.preventDefault()

    if (onSubmit) {
      const nickname = e.target.elements.nickname.value
      const password = e.target.elements.password.value

      onSubmit({nickname, password})
    }
  }

  render() {
    const {redirectBlock, children} = this.props

    return (
      <Form horizontal={true} style={{width: "50%", margin: "0 auto"}} onSubmit={this.onFormSubmit}>
        <ControlLabel>{children}</ControlLabel>
        <FieldGroup type="text" placeholder="nickname" name="nickname"/>
        <PasswordFieldGroup/>
        <Button type="submit" style={{width: "100%"}}>Submit</Button>
      </Form>
    )
  }
}
