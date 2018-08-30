import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


class Blog extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render() {
    const { blog, like, deletable, remove } = this.props

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const contentStyle = {
      display: this.state.visible? '' : 'none',
      margin: 5,
    }

    const adder = blog.user ? blog.user.name : 'anonymous'

    return (
      <div style={blogStyle}>
        <Link to={`/blogs/${blog._id}`}>{blog.title} by {blog.author}</Link>
        <div style={contentStyle} className='content'>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <Button bsStyle="success" onClick={like}>Like</Button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={remove}>delete</button></div>}
        </div>
      </div>
    )
  }
}

export default Blog