import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import { notify } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => dispatch(setBlogs( blogs )))
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
      dispatch(notify(`Welcome back ${user.username}!`, 'success'))
    } catch (exception) {
      dispatch(notify(exception.response.data.err, 'error'))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    dispatch(notify('Goodbye', 'success'))
  }

  const likeBlog = async (id, updatedBlog) => {
    try {
      const blog = await blogService.update(id, updatedBlog)
      blog.user = user
      setBlogs(blogs.map(b => b.id !== blog.id ? b : blog))
    } catch (exception) {
      notify(exception.response.data.err, 'error')
    }
  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notify(`Removed blog ${blog.title} by ${blog.author} successfully`, 'success')
      } catch (exception) {
        notify(exception.response.data.err, 'error')
      }
    }
  }

  if (!user) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </>
    )
  }

  return (
    <div>
      <h2 id="blogs">blogs</h2>
      <Notification />

      <p>
        {user.username} logged in
        <button id="logout" onClick={logout}>logout</button>
      </p>

      <CreateBlogForm user={user} />

      <BlogList
        user={user}
        likeClick={likeBlog}
        removeClick={removeBlog}
      />
    </div>
  )
}

export default App