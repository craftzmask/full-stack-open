import { useState } from 'react'

const CreateBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = async e => {
    e.preventDefault()
    try {
      await addBlog({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error(exception.response.data.err)
    }
  }

  return (
    <form onSubmit={create}>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>

      <button type="submit" id="create-button">create</button>
    </form>
  )
}

export default CreateBlogForm