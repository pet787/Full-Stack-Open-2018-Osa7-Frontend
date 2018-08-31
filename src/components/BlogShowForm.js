import React from 'react'
import { connect } from 'react-redux'
import { blogComment, blogVote, blogDelete } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

class BlogShowForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

    handleInputChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    addComment = (blog) => async (event) => {
      event.preventDefault()
      const comment = this.state.comment
      if (comment.length === 0) {
        this.props.notify( 'Blank comments are not added', 'error' )
        return
      }
      this.props.blogComment( blog._id, comment )
      this.setState({
        comment: ''
      })
      document.getElementsByName('comment')[0].value = ''
      this.props.notify( 'Comment "' + comment + '" was added to blog "' + blog.title + '"', 'info' )
    }

  blogById = ( id ) => {
    return this.props.blogs.find( blog => blog._id === id )
  }

  like = ( id ) => async (event) => {
    event.preventDefault()
    const liked = this.props.blogs.find( b => b._id === id )
    this.props.blogVote( liked )
    this.props.notify(`you liked '${liked.title}' by ${liked.author}`, 'info')
  }

remove = ( id ) => async () => {
  const deleted = this.props.blogs.find( b => b._id === id )
  const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
  if ( !ok ) return

  this.props.blogDelete( id )
  this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`, 'info')
  this.props.history.push('/blogs')
}

render() {
  const blogs = this.props.blogs


  if (blogs.length === 0 ) {
    return null
  }
  const { id } = this.props
  const blog = this.blogById( id )
  const user = this.props.login
  const deletable = blog.user === undefined || blog.user.username === user.username
  const deleteVisibleStyle = { display: deletable ? '' : 'none' }
  const adder = blog.user ? blog.user.name : 'anonymous'
  const comments = blog.comments
  return (
    <div>
      <h2>{ blog.title }</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <Button bsStyle="success" onClick={this.like(blog._id)}>Like +1</Button>
      </div>
      <div>
        added by {adder}
      </div>
      <div style={deleteVisibleStyle}>
        <Button bsStyle="danger" onClick={this.remove(blog._id)}>Delete</Button>
      </div>
      <h3>Comments</h3>
      <input
        type='text'
        value={this.props.comment}
        name='comment'
        onChange={this.handleInputChange}
      />
      <Button bsStyle="success" onClick={this.addComment(blog)}>Add comment</Button>
      {comments.map(( comment, index ) => ( <p key={index} > {comment} </p>) ) }
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login
  }
}

export default connect(
  mapStateToProps,
  { blogComment, blogVote, blogDelete, notify }
)(BlogShowForm)