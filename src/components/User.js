import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {

  render() {
    const { user, onClick } = this.props

    return (
        <tr onClick={ onClick } >
            <th><Link to={`/users/${user._id}`}>{user.name}</Link></th>
            <th>{user.blogs.length }</th>
        </tr>
    )
  }
}

export default User