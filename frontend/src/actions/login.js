import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED} from '../constants/auth/login'
import {authenticate, login} from '../services/AuthService'
import {USER_AUTHENTICATED} from '../constants/auth/index'

export const loginUser = ({nickname, password}) => async (dispatch) => {
  dispatch({type: USER_LOGIN_REQUEST})

  try {
    const loginData = await login({nickname, password})

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {...loginData},
    })
  } catch(error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.data.detail
    })
  }
}

export const authenticateUser = () => {
  const authUserData = authenticate()

  return {
    type: USER_AUTHENTICATED,
    payload: {...authUserData},
  }
}