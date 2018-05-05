import {CHAT_ROOM_ADD_MESSAGE} from '../../constants/channel/chat/ChatRoom'

export const sendMessage = (socket, messageInfo) => dispatch => {
  // dispatch({
  //   type: CHAT_ROOM_ADD_MESSAGE,
  //   payload: {...messageInfo}
  // })

  const data = JSON.stringify({
    content: messageInfo.content,
    user: {
      nickname: messageInfo.user.nickname
    }
  })
  // console.log('sending data: ', data)
  socket.send(data)
}