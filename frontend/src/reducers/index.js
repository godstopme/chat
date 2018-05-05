import {combineReducers} from 'redux'
import {userLogin} from './userLogin'
import channel from './channel/channel'
import chatRoom from './channel/chat/ChatRoom'

export default combineReducers({
  auth: userLogin,
  channel, chatRoom,
})
