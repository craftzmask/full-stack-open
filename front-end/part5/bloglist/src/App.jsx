import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import userService from './services/users'

import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog/Blog'
import UserList from './components/UserList'

import { notify } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { selectUser, setUser, clearUser } from './reducers/userReducer'
import User from './components/User'

const App = () => {
  const [users, setUsers] = useState([])
  const viewdUsermatch = useMatch('/users/:id')
  const viewedUser = viewdUsermatch
  ? users.find(u => u.id === match.params.id)
  : null

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => dispatch(setBlogs( blogs )))
    userService
      .getAll()
      .then(users => setUsers(users))
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
    <>
      <h2 id="blogs">blogs</h2>
      <Notification />

      <p>
        {user.username} logged in
        <button id="logout" onClick={logout}>logout</button>
      </p>
      <CreateBlogForm />

      <Routes>
        <Route index element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/users/:id' element={<User user={viewedUser} />} />
        <Route path='/users' element={<UserList users={users} />} />
      </Routes>
    </>
  )
}

export default App