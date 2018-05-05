import {CHAT_ROOM_MESSAGE_RECEIVED, CHAT_ROOM_ADD_MESSAGE} from '../../../constants/channel/chat/ChatRoom'

const initialState = {
  chatHistory: [], // {user, content, datetime}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHAT_ROOM_MESSAGE_RECEIVED:
    case CHAT_ROOM_ADD_MESSAGE:
      return {
        ...state,
        chatHistory: [...state.chatHistory, {...action.payload}],
      }
    default:
      return state
  }
}