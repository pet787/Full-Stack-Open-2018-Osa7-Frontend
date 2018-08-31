import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {

  render() {
    const { user } = this.props

    return (
      <tr >
        <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
        <td>{user.blogs.length }</td>
      </tr>
    )
  }
}

export default User