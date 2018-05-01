import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'


export default initialState => createStore(
  reducer, initialState,
  applyMiddleware(
    thunk
  ),
)
