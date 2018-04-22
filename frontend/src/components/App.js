import React from 'react'
import {Switch, Route} from 'react-router-dom'
import AuthenticatedRoute from '../common/AuthenticatedRoute'
import MainPage from '../containers/MainPage'
import SignUpForm from '../components/auth/SignUpForm'
import LoginForm from '../components/auth/LoginForm'

export default () => (
  <div className="App">
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignUpForm} />
      <AuthenticatedRoute exact to='/' component={MainPage} redirectLoginPath='/login' authenticated={false} />
    </Switch>
  </div>
)