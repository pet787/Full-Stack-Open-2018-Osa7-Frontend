import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'

class LoggedForm extends React.Component {

  logout = async (event) => {
    event.preventDefault()
    this.props.userLogout()
    this.props.notify('logged out', 'info')
    this.props.history.push('/')
  }

    render() {
        const user = this.props.login
        return (
            <div>
              <Link to="/blogs">Blogs</Link> &nbsp;
              <Link to="/users">Users</Link> &nbsp;
              {user.name} logged in <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
  }

export default connect(
    mapStateToProps,
    { userLogout, notify }
  )(LoggedForm)