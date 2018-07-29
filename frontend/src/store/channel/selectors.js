import {createSelector} from 'reselect'


export const getChannel = state => state.channel

export const getChannelRooms = channel => channel.rooms

export const getChannelInfo = channel => channel.information

export const getChannelMetaInfo = channel => channel.meta.currentRoomId

export const getChannelRoom = createSelector(
  getChannelRooms,
  (_, props) => props.roomId,
  (rooms, roomId) => rooms[roomId]
)

export const getCurrentRoom = createSelector(
  [getChannelRooms, getChannelMetaInfo],
  (rooms, currentRoomId) => rooms[currentRoomId]
)