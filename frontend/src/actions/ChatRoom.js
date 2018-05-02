import {CHAT_ROOM_MESSAGE_RECEIVED, CHAT_ROOM_USER_CONNECTED, USER_SELECTED_CHAT_ROOM} from '../constants/chat/ChatRoom'
import {CHAT_ROOM_ADD_MESSAGE} from '../constants/chat/ChatRoom'

const userChatRoomSocket = (user, chatRoom, dispatch) => {
  console.log('connectin . . .')
  let socket = new WebSocket(`ws://127.0.0.1:3000/ws/chat/`)
  console.log(socket)

  socket.onopen = () => {
    console.log('opened socket')
    dispatch({
      type: CHAT_ROOM_USER_CONNECTED,
      payload: {user, chatRoom, socket}
    })
  }

  socket.onmessage = data => {
    const message = JSON.parse(data)

    dispatch({
      type: CHAT_ROOM_MESSAGE_RECEIVED,
      payload: {user, chatRoom, socket, message}
    })
  }
}

export const connectUserToChatRoom = ({user, chatRoom}) => (dispatch) => {
  dispatch({
    type: USER_SELECTED_CHAT_ROOM,
    payload: {user, chatRoom},
  })

  // userChatRoomSocket(user, chatRoom, dispatch)
}

export const sendMessage = (socket, messageInfo) => dispatch => {
  dispatch({
    type: CHAT_ROOM_ADD_MESSAGE,
    payload: {...messageInfo}
  })
  socket.send(JSON.stringify(messageInfo))
}