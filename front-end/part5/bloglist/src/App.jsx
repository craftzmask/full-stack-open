import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const login = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
        <form onSubmit={login}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App