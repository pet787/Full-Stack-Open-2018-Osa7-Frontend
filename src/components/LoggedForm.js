import React from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'


class LoggedForm extends React.Component {

  logout = async (event) => {
    event.preventDefault()
    this.props.userLogout()
    this.props.notify('logged out', 'info')
    this.props.history.push('/')
  }

  render() {

    const unactiveStyle = {
      background: 'lightblue',
      color: 'black',
      display: 'block',
      textAlign: 'center',
      padding: 10,
      textDecoration: 'none',
    }

    const activeStyle = {
      fontWeight: 'bold',
      background: 'black',
      color: 'white',
      display: 'block',
      textAlign: 'center',
      padding: 10,
      textDecoration: 'none',
    }

    const ulStyle = {
      listStyleType: 'none',
      background: 'lightblue',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }

    const liStyle = {
      float: 'left',
    }

    const liStyleRight = {
      float: 'right',
      margin: 3,
    }

    const liStyleRight10 = {
      float: 'right',
      margin: 10,
    }

    const user = this.props.login


    return (
      <div>
        <ul style={ulStyle} >
          <li style={liStyle} ><NavLink to="/blogs" style={unactiveStyle} activeStyle={activeStyle}>Blogs</NavLink></li>
          <li style={liStyle} ><NavLink to="/users" style={unactiveStyle} activeStyle={activeStyle}>Users</NavLink></li>
          <li style={liStyleRight} ><Button bsStyle="success" onClick={this.logout}>Logout</Button></li>
          <li style={liStyleRight10} >{user.name} logged in</li>
        </ul>
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