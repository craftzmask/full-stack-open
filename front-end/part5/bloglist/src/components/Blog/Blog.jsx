import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBLog, removeBlog } from '../../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const showDetail = () => (
    <div className='blogDetails'>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button className='likeButton' onClick={() => dispatch(likeBLog(blog))}>
          like
        </button>
      </p>
      <p>{blog.user?.username}</p>
      {
        blog.user?.username === user.username
          ? <button id="remove-button" onClick={() => dispatch(removeBlog(blog.id))}>
              remove
            </button>
          : null
      }
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='toggleButton' onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && showDetail()}
    </div>
  )
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default Blog