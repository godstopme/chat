import {combineReducers} from 'redux'
import {userLogin} from './userLogin'
import chatRoom from './ChatRoom'

export default combineReducers({
  userLogin, chatRoom
})
