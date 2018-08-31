import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { blogDelete, blogVote } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Table } from 'react-bootstrap'

class BlogsForm extends React.Component {

  render() {
    const byLikes = ( b1, b2 ) => b2.likes - b1.likes
    const blogs = this.props.blogs.sort( byLikes )
    return (
      <div>
        <h2>Blogs</h2>
        <Table striped><tbody>
          <tr>
            <th>Title</th><th>Author</th>
          </tr>
          { blogs.map( blog =>
            <Blog
              key={blog._id}
              blog={blog}
            />
          )}
        </tbody></Table>
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