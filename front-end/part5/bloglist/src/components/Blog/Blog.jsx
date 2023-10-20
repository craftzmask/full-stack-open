import { useDispatch, useSelector } from 'react-redux'
import { likeBLog, selectBlogs } from '../../reducers/blogReducer'
import { useParams } from 'react-router-dom'

import CommentList from '../CommentList'
import CommentForm from '../CommentForm'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(selectBlogs)
  const blog = blogs.find(b => b.id === id)
  
  if (!blog) return null

  return (
    <div className='blog'>
      <h1>{blog.title}</h1>
      <a href="#">{blog.url}</a>
      <p>
        likes {blog.likes}
        <button
          className='likeButton'
          onClick={() => dispatch(likeBLog(blog))}
        >
          like
        </button>
      </p>
      <p>added by {blog.author}</p>

      <h3>comments</h3>
      <CommentForm blog={blog} />
      <CommentList blog={blog} />
    </div>
  )
}

export default Blog