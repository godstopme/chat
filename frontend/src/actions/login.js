import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED} from '../constants/auth/login'
import {login} from '../services/AuthService'

export const loginUser = ({nickname, password}) => async (dispatch) => {
  dispatch({type: USER_LOGIN_REQUEST})

  try {
    const response = await login({nickname, password})
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    })
  } catch(error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.data.detail
    })
  }
}