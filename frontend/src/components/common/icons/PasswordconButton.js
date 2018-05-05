import React from 'react'

import IconButton from 'material-ui/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export default ({showPassword = false, onClick = () => {}}) =>
  <IconButton onClick={onClick}>
    {showPassword ? <VisibilityOff/> : <Visibility/>}
  </IconButton>
