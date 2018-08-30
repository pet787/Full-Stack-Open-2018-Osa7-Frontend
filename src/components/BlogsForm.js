import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { blogDelete, blogVote } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class BlogsForm extends React.Component {

    like = (id) => async () => {
      const liked = this.props.blogs.find(b => b._id===id)
      this.props.blogVote( liked )
      this.props.notify(`you liked '${liked.title}' by ${liked.author}`, 'info')
    }

    remove = (id) => async () => {
      const deleted = this.props.blogs.find( b => b._id === id )
      const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
      if ( !ok ) return

      this.props.blogDelete( id )
      this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`, 'info')
    }

    render() {
      const user = this.props.login
      const byLikes = ( b1, b2 ) => b2.likes - b1.likes
      const blogs = this.props.blogs.sort( byLikes )
      return (
        <div>
          <h2>blogs</h2>
          { blogs.map( blog =>
            <Blog
              key={blog._id}
              blog={blog}
              like={this.like(blog._id)}
              remove={this.remove(blog._id)}
              deletable={blog.user === undefined || blog.user.username === user.username}
            />
          )}
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login
  }
}

export default connect(
  mapStateToProps,
  { blogVote, blogDelete, notify }
)(BlogsForm)