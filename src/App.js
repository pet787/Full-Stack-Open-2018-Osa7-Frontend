import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedForm from './components/LoggedForm'
import UsersForm from './components/UsersForm'
import UserForm from './components/UserForm'
import CreateBlogForm from './components/CreateBlogForm'

import { blogInitialization } from './reducers/blogReducer'
import { userInitialization } from './reducers/userReducer'
import { userCheck } from './reducers/loginReducer'

class App extends React.Component {

  componentWillMount() {
    this.props.blogInitialization()
    this.props.userInitialization()
    this.props.userCheck()
  } 
  
render() {
    return (
      <Router>
      <div>
        <Notification />
        <Route exact path="/" render={ ( { history } ) => 
          <LoginForm history={history} /> 
        } />
        <Route path="/blogs" render={ ( { history } ) => {
          return(  
            <div>
              <LoggedForm history={history} />
              <CreateBlogForm history={history} />
              <BlogsForm history={history} />
            </div>
          )
        } } />
        <Route exact path="/users" render={ ( { history } ) => { 
          return(  
            <div>
              <LoggedForm history={history} />
              <CreateBlogForm history={history} />
              <UsersForm history={history} />
              <UserForm id = '5b71a62ad9b41c0310002cbe' />
          </div>
          )
        } } />
        <Route exact path="/users/:id" render={ ( { match, history } ) => {
          return (
            <div>
              <LoggedForm history={history} />
              <UserForm id = { match.params.id } xxx = {this.props.users}/>
            </div>
          ) 
        } } />
       </div>
      </Router>
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
  { blogInitialization, userInitialization, userCheck }
)(App)
