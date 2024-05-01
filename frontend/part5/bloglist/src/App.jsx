import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    const user = await loginService.login({ username, password })
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
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
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
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