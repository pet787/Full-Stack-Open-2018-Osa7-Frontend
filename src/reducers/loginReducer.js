import blogService from '../services/blogs'
import loginService from '../services/login'
import { UV_UDP_REUSEADDR } from 'constants';

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

export const userLogin = ( credentials ) => {
    return async (dispatch) => {
        try {
            console.log('start login')
            const user = await loginService.login( credentials )
            console.log('user', user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            console.log('logout')
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
                data: UV_UDP_REUSEADDR
            })
        } else {
            dispatch({
              type: 'LOGOUT'
            })
        }
    }
}
  
export default loginReducer