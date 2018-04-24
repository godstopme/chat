const initialState = {
  failed: false,
  loggingIn: false,
  loggedIn: false,
  detail: '',
}

export const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        loggingIn: true,
      }
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
      }
    case 'USER_LOGIN_FAILED':
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