import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default initialState => createStore(
  reducer, initialState,
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  ),
)
