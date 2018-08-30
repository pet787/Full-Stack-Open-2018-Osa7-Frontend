import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {

  render() {
    const { user } = this.props

    return (
      <tr >
        <th><Link to={`/users/${user._id}`}>{user.name}</Link></th>
        <th>{user.blogs.length }</th>
      </tr>
    )
  }
}

export default User