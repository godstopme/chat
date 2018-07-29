import {createReducer} from 'redux-act'

export default (defaultValue, action) =>
  createReducer({}, defaultValue).on(action, (state, payload) => payload)
