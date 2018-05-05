import {combineReducers} from 'redux'
import channel from './channel'
import chatRoom from './chat/ChatRoom'


export default combineReducers({
  channel,
  chatRoom,
})