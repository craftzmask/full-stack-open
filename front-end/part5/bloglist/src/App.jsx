import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify(`Welcome back ${user.username}!`, 'success')
    } catch (exception) {
      notify(exception.response.data.err, 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    notify("Goodbye", 'success')
  }

  const addBlog = async newBlog => {
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      blogFormRef.current.toggleVisibility()
      notify(`a new blog ${savedBlog.title} by ${savedBlog.author} saved`, 'success')
    } catch (exception) {
      notify(exception.response.data.err, 'error')
    }
  }

  const notify = (message, status) => {
    setMessage(message)
    setStatus(status)
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2000)
  }

  if (!user) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={message} status={status} />
        <LoginForm login={login} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} status={status} />

      <p>
        {user.username} logged in
        <button onClick={logout}>logout</button>
      </p>

      <Togglable labelButton="new blog" ref={blogFormRef}>
        <CreateBlogForm addBlog={addBlog} />
      </Togglable>

      <BlogList blogs={blogs} />
    </div>
  )
}

export default App