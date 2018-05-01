import {USER_SELECTED_CHAT_ROOM} from '../constants/chat/ChatRoom'
import {CHAT_ROOM_USER_CONNECTED, CHAT_ROOM_MESSAGE_RECEIVED, CHAT_ROOM_ADD_MESSAGE} from '../constants/chat/ChatRoom'

const initialState = {
  user: {},
  messages: [], // {user, text, datetime}
  socket: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SELECTED_CHAT_ROOM:
      return {
        ...state,
        user: action.payload.user,
        socket: action.payload.socket,
      }
    case CHAT_ROOM_MESSAGE_RECEIVED:
    case CHAT_ROOM_ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      }
    case CHAT_ROOM_USER_CONNECTED:
      return {
        ...state,
        user: action.payload.user,
        socket: action.payload.socket
      }
    default:
      return state
  }
}