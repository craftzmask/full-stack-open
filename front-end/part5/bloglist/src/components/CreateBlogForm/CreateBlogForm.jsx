import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../../services/blogs'

import { createBlog } from '../../reducers/blogReducer'
import { notify } from '../../reducers/notificationReducer'

import Togglable from '../Togglable'
import { selectUser } from '../../reducers/userReducer'

const CreateBlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const blogFormRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async e => {
    e.preventDefault()
    try {
      const newBlog = { title, author, url }
      const savedBlog = await blogService.create(newBlog)
      savedBlog.user = user
      console.log(user)
      dispatch(createBlog(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
      notify(`a new blog ${savedBlog.title} by ${savedBlog.author} saved`, 'success')
    } catch (exception) {
      console.log(exception)
      notify(exception.response.data.err, 'error')
    }
  }

  return (
    <Togglable labelButton="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
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
    </Togglable>
  )
}

export default CreateBlogForm