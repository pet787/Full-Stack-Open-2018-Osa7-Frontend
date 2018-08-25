import React from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { blogInitialization, blogCreation } from './reducers/blogReducer'
import { userInitialization } from './reducers/userReducer'
import { userLogin, userLogout, userCheck } from './reducers/loginReducer'
import { notify } from './reducers/notificationReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '', 
      title: '',
      author: '',
      url: '',
    }
  }

  componentWillMount() {
    this.props.blogInitialization()
    this.props.userInitialization()
    this.props.userCheck()
  } 

  notify = (message, type = 'info') => {
    this.props.notify(message, type)
  }

  like = (id) => async () => {
    const liked = this.props.blogs.find(b=>b._id===id)
    this.props.blogVote( liked )
    this.props.notify(`you liked '${liked.title}' by ${liked.author}`)
  }

  remove = (id) => async () => {
    // const deleted = this.state.blogs.find(b => b._id === id)
    // const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    // if ( ok===false) {
    //   return
    // }

    // await blogService.remove(id)
    // this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    // this.setState({
    //   blogs: this.state.blogs.filter(b=>b._id!==id)
    // })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.props.blogCreation( blog )    

    const text = 'blog ' + blog.title + ' by ' + blog.author + ' added'
    this.props.notify(text)
    // this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({ 
      title: '', 
      url: '', 
      author: '',
    })
  }

  logout = () => {
    this.props.userLogout()
    this.props.notify('logged out')
  }

  login = async (event) => {
    event.preventDefault()
    this.props.userLogin({ username: this.state.username, password: this.state.password })
    const user = this.props.login
    if (user === null || user.length === 0) {
      this.props.notify('welcome back!', 'info')
    } else {
      this.props.notify('käyttäjätunnus tai salasana virheellinen', 'error')
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const user = this.props.login
    if (user === null || user.length === 0) {
      return (
        <div>
          <Notification />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              salasana
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

    const byLikes = (b1, b2) => b2.likes - b1.likes

    // const blogsInOrder = null
    const blogsInOrder = this.props.blogs.sort(byLikes)
    console.log(blogsInOrder)

    return (
      <div>
        <Notification />

        {user.name} logged in <button onClick={this.logout}>logout</button>

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm 
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>

        <h2>blogs</h2>
        {blogsInOrder.map(blog => 
          <Blog 
            key={blog._id} 
            blog={blog} 
            like={this.like(blog._id)}
            remove={this.remove(blog._id)}
            deletable={blog.user === undefined || blog.user.username === user.username}
          />
        )}
      </div>
    )
  }
}

const giveNotification = (notification) => {
  return notification
}
 
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    login: state.login,
    notification: giveNotification(state.notification)
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, blogCreation, userInitialization, userLogin, userLogout, userCheck, notify }
)(App)
