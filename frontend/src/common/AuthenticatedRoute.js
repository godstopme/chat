import React from 'react'
import {Redirect, Route} from 'react-router-dom'

export default ({component: Component, authenticated, redirectLoginPath, ...routeProps}) => (
  <Route {...routeProps} render={props => (
    authenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect from={`${props.location}`} to={redirectLoginPath}/>
    )
  )}/>
)