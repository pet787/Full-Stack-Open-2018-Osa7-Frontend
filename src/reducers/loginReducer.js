import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = [], action) => {
//   console.log('ACTION: ', action)
  switch (action.type) {
  case 'LOGIN': {
    return action.data
  }
  case 'LOGOUT': {
    return null
  }
  default:
    return state
  }
}

export const userLogin = ( credentials, success, failure ) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login( credentials )
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      success()
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      failure()
      dispatch({
        type: 'LOGOUT',
      })
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const userCheck = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken( user.token )
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } else {
      dispatch({
        type: 'LOGOUT'
      })
    }
  }
}

export default loginReducer

