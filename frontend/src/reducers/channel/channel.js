import {CONNECT_TO_CHANNEL} from '../../constants/channel'

const initialState = {
  channelName: '',
  socket: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_TO_CHANNEL:
      console.log('connect to channel', action.payload)
      return {
        ...state,
        socket: action.payload.socket,
      }
    default:
      return state
  }
}