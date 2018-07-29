import {createSelector} from 'reselect'
import {getCurrentRoom} from '../channel/selectors'

export const geChat = createSelector(
  getCurrentRoom,
  room => room.chat
)

export const getRoomInformation = createSelector(
  getRoom,
  room => room.information
)
