import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
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

  const createBlog = async e => {
    e.preventDefault()

    const savedBlog = await blogService.create({
      title, author, url
    })

    setBlogs(blogs.concat(savedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

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
      
      <h2>create new</h2>
      <NewBlogForm
        title={title}
        onTitleChange={e => setTitle(e.target.value)}
        author={author}
        onAuthorChange={e => setAuthor(e.target.value)}
        url={url}
        onUrlChange={e => setUrl(e.target.value)}
        onSubmit={createBlog}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App