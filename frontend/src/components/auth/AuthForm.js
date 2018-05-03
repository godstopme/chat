import React, {Component} from 'react'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input'
import Typography from 'material-ui/Typography'
import { InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import PasswordIconButton from '../common/icons/PasswrdIconButton'
import styled from 'styled-components'

const submitForm = e => {
  e.preventDefault()
}

const CenteredForm = styled('from')`
  position: fixed;
  
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
`


export default class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPassword: false,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.showPasswordHandler = this.showPasswordHandler.bind(this)
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

  showPasswordHandler() {
    this.setState({showPassword: !this.state.showPassword})
  }

  render() {
    const {redirectBlock, children} = this.props

    return (
      <CenteredForm onSubmit={this.onFormSubmit}>
        <Typography variant="caption">
          {children}
        </Typography>
        <FormControl>
          <Input
            type="text"
            placeholder="nickname"
          />
        </FormControl>
        <FormControl>
          <Input
            type={this.state.showPassword ? 'text' : 'password'}
            placeholder="password"
            endAdornment={
              <InputAdornment position="end">
                <PasswordIconButton
                  showPassword={this.state.showPassword}
                  onClick={this.showPasswordHandler}
                />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button type="submit" color="primary">Sign In</Button>
      </CenteredForm>
    )
  }
}
