import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            value={title}
            name='title'
            onChange={handleChange}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            name='author'
            onChange={handleChange}
          />
        </div>
        <div>
          URL:
          <input
            value={url}
            name='url'
            onChange={handleChange}
          />
        </div>
        <Button bsStyle="success" onClick={handleSubmit}>Create</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm