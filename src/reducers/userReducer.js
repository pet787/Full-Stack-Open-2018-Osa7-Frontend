import userService from '../services/users'

const userReducer = (state = [], action) => {
  // console.log('ACTION: ', action)
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer