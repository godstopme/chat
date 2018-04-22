import React from 'react'
import {Switch, Route} from 'react-router-dom'
import AuthenticatedRoute from '../common/AuthenticatedRoute'
import MainPage from '../containers/MainPage'

export default () => (
  <div className="App">
    <Switch>
      <AuthenticatedRoute exact to='/' component={MainPage} authenticated={false} />
    </Switch>
  </div>
)