const initialState = { 
  message: 'Application started',
  type: 'info'
}

const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': 
      return { 
        message: action.note,
        type: action.notificationType
      }
    case 'CLEAR_NOTIFICATION': return null
    default: return store
  }
}

export const notify = ( message, notificationType, timeout = 10) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      note: message,
      notificationType : notificationType
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeout * 1000 )
  }
}

export default notificationReducer