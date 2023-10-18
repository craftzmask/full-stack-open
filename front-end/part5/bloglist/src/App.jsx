import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import blogService from './services/blogs'

import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

import { notify } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { selectUser, setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(selectUser)
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
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    dispatch(clearUser())
    dispatch(notify('Goodbye', 'success'))
  }

  if (!user) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
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

      <CreateBlogForm />

      <BlogList />
    </div>
  )
}

export default App