import React from 'react'
import AuthForm from './AuthForm'
import ConcealingSpinner from '../common/ConcealingSpinner'

export default () => (
  <ConcealingSpinner>
    <AuthForm/>
  </ConcealingSpinner>
)
