import {CHAT_ROOM_ADD_MESSAGE} from '../../constants/channel/chat/ChatRoom'

export const sendMessage = (socket, messageInfo) => dispatch => {
  console.log('Sending message', messageInfo)
  dispatch({
    type: CHAT_ROOM_ADD_MESSAGE,
    payload: {...messageInfo}
  })
  socket.send(JSON.stringify(messageInfo))
}