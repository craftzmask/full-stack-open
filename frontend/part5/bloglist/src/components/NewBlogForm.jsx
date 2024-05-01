import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const savedBlog = await blogService.create({
      title, author, url
    })

    onSubmit(savedBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        author: <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url: <input
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm