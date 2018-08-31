import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

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

  loginSuccess = () => () => {
    this.props.notify('welcome back!', 'info')
    this.props.history.push('/blogs')
  }

  loginFailure = () => () => {
    this.props.notify('käyttäjätunnus tai salasana virheellinen', 'error')
  }

  login = async (event) => {
    event.preventDefault()
    const credentials ={ username: this.state.username, password: this.state.password }
    console.log( credentials )
    this.props.userLogin( credentials, this.loginSuccess(), this.loginFailure() )
  }

  render() {
    return (
      <div>
        <h2>Login to app</h2>
        <form onSubmit={this.login}>
          <FormGroup>
            <ControlLabel>Username:</ControlLabel>
            <FormControl
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginChange}
            />
            <ControlLabel>Password:</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginChange}
            />
            <Button bsStyle="success" type="submit">Login</Button>
          </FormGroup>
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