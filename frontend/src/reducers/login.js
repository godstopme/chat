const initialState = {
  failed: false,
  loggingIn: false,
  detail: ''
}



export const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        loggingIn: true,
      }
    case 'USER_LOGIN_FAILED':
      return {
        ...state,
        failed: true,
        loggingIn: false,
        details: action.payload.detail,
      }
    default:
      return state
  }
}