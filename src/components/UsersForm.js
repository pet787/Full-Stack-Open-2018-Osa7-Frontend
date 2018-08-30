import React from 'react'
import { connect } from 'react-redux'
import User from './User'


class UsersForm extends React.Component {

  logout = async (event) => {
    event.preventDefault()
    this.props.userLogout()
    this.props.notify('logged out', 'info')
    this.props.history.push('/')
  }

    userClick = (user) => (event) => {
      event.preventDefault()
      console.log('user click', user)
    }

    render() {
      const userStyle = {
        textAlign: 'left'
      }

      return (
        <div>
          <h2>users</h2>
          <table style = {userStyle}>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Blogs added</th>
              </tr>
              {this.props.users.map(user =>
                <User
                  key={user._id}
                  user={user}
                />
              )}
            </tbody>
          </table>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UsersForm)

