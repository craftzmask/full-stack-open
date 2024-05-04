import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)
  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    let user = localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      notify(`logged in successful`, 'success')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }
  console.log(user)
  const createBlog = async blog => {
    const savedBlog = await blogService.create(blog)
    setBlogs(blogs.concat(savedBlog))
    newBlogFormRef.current.toggleVisibility()
    notify(`${savedBlog.title} by ${savedBlog.author} added`, 'success')
  }

  const notify = (message, status) => {
    setMessage(message)
    setStatus(status)
    setTimeout(() => {
      setMessage(null)
      setStatus(null)
    }, 5000)
  }

  const handleLikeClick = async blog => {
    const updated = await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })

    setBlogs(blogs.map(b => b.id !== updated.id ? b : updated))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} status={status} />
        <LoginForm
          username={username}
          onUsernameChange={e => setUsername(e.target.value)}
          password={password}
          onPasswordChange={e => setPassword(e.target.value)}
          onSubmit={login}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} status={status} />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
      
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <h2>create new</h2>
        <NewBlogForm onSubmit={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={handleLikeClick} />
      )}
    </div>
  )
}

export default App