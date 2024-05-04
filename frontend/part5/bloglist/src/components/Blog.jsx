import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onDelete }) => {
  const [visiable, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {console.log(blog)}
      {blog.title} {blog.author}
      <div style={{ display: visiable ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={() => onLike(blog)}>likes</button></div>
        <div>{blog.user.name}</div>
        <button onClick={() => onDelete(blog)}>remove</button>
      </div>
      <button onClick={() => setVisible(!visiable)}>
        {visiable ? 'hide' : 'view'}
      </button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog