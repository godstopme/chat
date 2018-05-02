import React from 'react'
import styled from 'styled-components'

const PaperComponent = ({...props, children}) =>
  <div {...props}>
    {children}
  </div>

export const Paper = styled(PaperComponent)`
  display: flex;
  flex-direction: ${props => props.column ? "column" : "row"};
`
