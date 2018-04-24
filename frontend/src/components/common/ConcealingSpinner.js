import React from 'react'
import Spinner from './Spinner'

export default ({isSpinning, innerText = 'Loading...', children}) =>
  isSpinning ?
    <Spinner innerText={innerText}/> :
    <div>
      {children}
    </div>
