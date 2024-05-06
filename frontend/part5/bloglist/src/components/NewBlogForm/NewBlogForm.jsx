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
          id="title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        author: <input
          id="author-input"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url: <input
          id="url-input"
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