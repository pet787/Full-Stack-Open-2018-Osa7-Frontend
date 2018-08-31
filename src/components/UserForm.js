import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

class UserForm extends React.Component {

  userById = ( id ) => {
    const user = this.props.users.find( user => user._id === id )
    return user
  }

  render() {
    const users = this.props.users
    if (users.length === 0 ) {
      return null
    }
    const { id } = this.props
    const user = this.userById( id )
    const blogs = user.blogs
    return (
      <div >
        <h2>{ user.name }</h2>
        <h3>Added blogs</h3>
        <Table striped><tbody>
          { blogs.map( blog => (
            <tr key = {blog._id}><td>{blog.title}</td></tr>
          ) )}
        </tbody></Table>
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
)(UserForm)