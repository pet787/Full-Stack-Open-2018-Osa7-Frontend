import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '', 
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    this.props.userLogin({ username: this.state.username, password: this.state.password })
    const user = this.props.login
    if (user === null || user.length === 0) {
        this.props.notify('käyttäjätunnus tai salasana virheellinen', 'error')
    } else {
        this.props.notify('welcome back!', 'info')
        this.props.history.push('/blogs')
    }
  }

    render() {
      return (
      <div>
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.login}>
          <div>
            Käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginChange}
            />
          </div>
          <div>
            Salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
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
    { userLogin, notify }
  )(LoginForm)