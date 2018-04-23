import axios from 'axios'

export const isAuthenticated = () => localStorage.token !== undefined && localStorage.token !== ''

export const signup = credentials => axios.post('/api/accounts/users/signup/', credentials)

export const login = ({nickname, password}) => {
  return (!isAuthenticated()) ? (
    axios.post('/api/account/user/login/', {nickname, password})
      .then(response => {
        const {token} = response.data
        localStorage.token = token
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`

        return token
      })
  ) : (
    Promise.resolve({
      token: localStorage.token
    })
  )
}

export const logout = () => (
  axios.post('/api/accounts/user/logout/')
    .then(response => {
      localStorage.removeItem('token')
      axios.defaults.headers.common['Authorization'] = ''

      return response
    })
)

export default {
  signup: signup,
  login: login,
  logout: logout,
}
