import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <div>
        title: <input
          data-testid="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        author: <input
          data-testid="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url: <input
          data-testid="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <button type="submit" className="create-blog">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default NewBlogForm