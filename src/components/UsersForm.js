import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import { Table } from 'react-bootstrap'

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

      return (
        <div>
          <h2>Users</h2>
          <Table striped>
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
          </Table>
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

