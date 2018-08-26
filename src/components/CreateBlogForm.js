import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { blogCreation } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class CreateBlogForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            url: '',
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addBlog = async (event) => {
        event.preventDefault()
    
        const blog = {
          title: this.state.title,
          author: this.state.author,
          url: this.state.url
        }
    
        this.props.blogCreation( blog )    
        this.props.notify(`blog '${blog.title}' by ${blog.author} added`, 'info')
    
        this.setState({ 
          title: '', 
          url: '', 
          author: '',
        })
    }

    render() {

        return (
            <Togglable buttonLabel='uusi blogi'>
            <BlogForm 
                handleChange={this.handleInputChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
            />
            </Togglable>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps,
    { blogCreation, notify }
)(CreateBlogForm)

