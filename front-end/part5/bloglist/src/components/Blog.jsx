import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetail = () => (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button>like</button>
      </p>
      <p>{blog.user?.username}</p>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && showDetail()}
    </div>  
  )
}
export default Blog