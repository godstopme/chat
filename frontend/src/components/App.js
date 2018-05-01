import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from '../common/AuthenticatedRoute'
import MainPage from './MainPage'
import SignUpForm from '../components/auth/SignUpForm'
import LoginForm from '../components/auth/LoginForm'
import {isAuthenticated} from '../services/AuthService'

export default () => (
  <div className="App">
    <Switch>
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path="/signup" component={SignUpForm}/>
      <AuthenticatedRoute exact to='/' component={MainPage} redirectLoginPath='/login'
                          authenticated={isAuthenticated}/>
    </Switch>
  </div>
)