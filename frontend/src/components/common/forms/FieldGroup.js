import React from 'react'
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap'

const FieldGroup = ({id, label, validationState = null, ...controlProps}) =>
  <FormGroup controlId={id ? id : null} validationState={validationState}>
    {label ? <ControlLabel>{label}</ControlLabel> : null}
    <FormControl {...controlProps} style={{borderRadius: '0'}}/>
  </FormGroup>


export const PasswordFieldGroup = ({withLabel = false, ...props}) =>
  <FieldGroup label={withLabel && 'password'} type="password" placeholder="password" name="password" {...props} />

export default FieldGroup