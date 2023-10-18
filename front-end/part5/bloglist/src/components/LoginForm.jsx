import { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { notify } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    await login({ username, password })
    setUsername('')
    setPassword('')
  }

  const login = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(notify(`Welcome back ${user.username}!`, 'success'))
    } catch (exception) {
      console.log(exception)
      dispatch(notify(exception.response.data.err, 'error'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" id="button-login">login</button>
    </form>
  )
}

export default LoginForm