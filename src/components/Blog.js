import React from 'react'
import { Link } from 'react-router-dom'


class Blog extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render() {
    const { blog } = this.props

    return (
      <tr>
        <td><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></td><td>{blog.author}</td>
      </tr>
    )
  }
}

export default Blog