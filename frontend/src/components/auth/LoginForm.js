import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AuthForm from './AuthForm'
import {loginUser} from '../../actions/login'

const LoginForm = ({loginUser}) => (
  <AuthForm onSubmit={loginUser}>
    If you don't have an account, then <Link to="/signup">sign up.</Link>
  </AuthForm>
)

const mapStateToProps = state => ({
  loginInfo: state.login
})

export default connect(mapStateToProps, {loginUser})(LoginForm)