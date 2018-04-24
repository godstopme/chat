import {login} from '../services/AuthService'

export const loginUser = ({nickname, password}) => dispatch => {
  dispatch({type: 'USER_LOGIN_REQUEST'})

  login({nickname, password})
    .then(response =>
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: response.data,
      }),
    )
    .catch(error =>
      dispatch({
        type: 'USER_LOGIN_FAILED',
        payload: error.data.detail,
      }),
    )
}