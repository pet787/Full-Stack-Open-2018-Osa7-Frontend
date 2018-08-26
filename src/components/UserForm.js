import React from 'react'
import { connect } from 'react-redux'

class UserForm extends React.Component {

  userById = ( id ) => {
    const user = this.props.users.find( user => user._id === Number( id ) )
    console.log('user found: ', user)
    return user
  }

  render() {

    const { id } = this.props
    const user = this.userById( id )

    return (
      <div >
            { user.name }
            Added blogs
            { JSON.stringify( user ) }
      </div>  
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      users: state.users
    }
  }

export default connect(
    mapStateToProps,
    null
)(UserForm)