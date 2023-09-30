import { useState } from 'react'

const Blog = ({ blog, user, likeClick, removeClick }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async () => {
    const { user, ...updatedBlog } = blog
    await likeClick(
      blog.id,
      { ...updatedBlog, likes: updatedBlog.likes + 1 }
    )
  }

  const remove = async () => {
    await removeClick(blog)
  }

  const showDetail = () => (
    <div className='blogDetails'>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button className='likeButton' onClick={like}>like</button>
      </p>
      <p>{blog.user?.username}</p>
      {
        blog.user?.username === user.username
          ? <button onClick={remove}>remove</button>
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
export default Blog