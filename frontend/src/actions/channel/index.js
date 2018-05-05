import {CHAT_ROOM_MESSAGE_RECEIVED} from '../../constants/channel/chat/ChatRoom'
import {CONNECT_TO_CHANNEL} from '../../constants/channel/index'

export const connectUserToChatRoom = ({user, chatRoom}) => (dispatch) => {
  // dispatch({
  //   type: USER_SELECTED_CHAT_ROOM,
  //   payload: {user, chatRoom},
  // })

  console.log('connectin . . .')
  let socket = new WebSocket(`ws://127.0.0.1:3000/ws/chat/`)

  socket.onopen = () => {
    console.log('opened socket', socket)
    dispatch({
      type: CONNECT_TO_CHANNEL,
      payload: {user, chatRoom, socket}
    })
  }

  socket.onmessage = data => {
    console.log(data)
    const message = JSON.parse(data)

    dispatch({
      type: CHAT_ROOM_MESSAGE_RECEIVED,
      payload: {user, socket, message}
    })
  }
}
