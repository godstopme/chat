import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default ({component: Component, authenticated, ...routeProps}) => (
  <Route {...routeProps} render={props => (
    authenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathName: '/login', state: {from: props.location}}}/>
    )
  )}/>
)