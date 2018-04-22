import React from 'react'
import {Link} from 'react-router-dom'
import AuthForm from './AuthForm'

export default () => (
  <div>
    <AuthForm/>
    Login! If you don't have an account, then <Link to="/signup">sign up.</Link>
  </div>
)