import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  // console.log('ACTION: ', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'VOTE_BLOG': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = { ...blogToChange, vote: blogToChange.vote + 1 }
    return state.map(blog => blog.id !== id ? blog : changedBlog )
  }
  case 'DELETE_BLOG': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = { ...blogToChange, vote: blogToChange.vote + 1 }
    return state.map(blog => blog.id !== id ? blog : changedBlog )
  }
  default:
    return state
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const notes = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: notes
    })
  }
}

export const blogCreation = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create( blog )
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const blogDelete = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const blogVote = ( blog ) => {
  return async (dispatch) => {
    const updated = { ...blog, likes: blog.likes + 1 }
    await blogService.update( blog.id, updated )
    dispatch({
      type: 'VOTE_BLOG',
      data: { id: blog.id }
    })
  }
}

export default blogReducer