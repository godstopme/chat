import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import AuthForm from './AuthForm'
import {loginUser} from '../../actions/login'
import ConcealingSpinner from '../common/ConcealingSpinner'
import {isAuthenticated} from '../../services/AuthService'


const LoginForm = ({failed, loggingIn, loggedIn, detail, loginUser}) =>
  (isAuthenticated()) ?
    <Redirect to="/"/> :
    <ConcealingSpinner isSpinning={loggingIn && !loggedIn}>
      <AuthForm onSubmit={loginUser}>
        If you don't have an account, then <Link to="/signup">sign up.</Link>
      </AuthForm>
    </ConcealingSpinner>

const mapStateToProps = state => state.userLogin

export default connect(mapStateToProps, {loginUser})(LoginForm)