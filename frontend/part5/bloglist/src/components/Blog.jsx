import { useState } from 'react'

const Blog = ({ blog }) => {
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
        <div>likes <button>likes</button></div>
        <div>{blog.userId?.name}</div>
      </div>
      <button onClick={() => setVisible(!visiable)}>
        {visiable ? 'hide' : 'view'}
      </button>
    </div>
  )
}

export default Blog