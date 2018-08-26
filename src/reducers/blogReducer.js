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
    const blogToChange = state.find(n => n._id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    return state.map(blog => blog._id !== id ? blog : changedBlog )
  }
  case 'DELETE_BLOG': {
    const id = action.data
    return state.filter( (blog) => { return blog._id !== id } )
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
    await blogService.update( blog._id, updated )
    dispatch({
      type: 'VOTE_BLOG',
      data: { id: blog._id }
    })
  }
}

export default blogReducer