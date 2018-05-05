import axios from 'axios'

export const isAuthenticated = () => localStorage.user && localStorage.user.token !== ''

export const signup = credentials => axios.post('/api/accounts/users/signup/', credentials)

export const login = ({nickname, password}) => {
  return (!isAuthenticated()) ? (
    axios.post('/api/accounts/user/login/', {nickname, password})
      .then(response => {
        localStorage.user = JSON.stringify(response.data)

        const {token} = response.data
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`

        return response.data
      })
  ) : (
    Promise.resolve(
      JSON.parse(localStorage.user)
    )
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
