import {USER_AUTHENTICATED} from '../constants/auth/index'
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED} from '../constants/auth/login'

const initialState = {
  failed: false,
  loggingIn: false,
  loggedIn: false,
  detail: '',
  user: {},
}

export const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      }
    case USER_AUTHENTICATED:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: {...action.payload},
      }
    case USER_LOGIN_FAILED:
      return {
        ...state,
        failed: true,
        loggingIn: false,
        loggedIn: false,
        detail: action.payload.detail,
      }
    default:
      return state
  }
}