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
    <div style={blogStyle} className="blog">
      <span>{blog.title} by {blog.author}</span>
      <div style={{ display: visiable ? '' : 'none' }} className="blog-details">
        <div>{blog.url}</div>
        <div>
          <span data-testid="likes">{blog.likes} likes</span>
          <button onClick={() => onLike(blog)} className="like">
            likes
          </button>
        </div>
        <div>{blog.user?.name}</div>
        <button onClick={() => onDelete(blog)}>remove</button>
      </div>
      <button onClick={() => setVisible(!visiable)} className="show-details">
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