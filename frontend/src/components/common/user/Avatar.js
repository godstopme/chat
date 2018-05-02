import React from 'react'
import MaterialUiAvatar from 'material-ui/Avatar'
import styled from 'styled-components'

const Avatar = styled(MaterialUiAvatar)`
  && {
    margin: 0 5px;
  }
`

export default ({...props, children}) =>
  <Avatar {...props}>
    {children}
  </Avatar>