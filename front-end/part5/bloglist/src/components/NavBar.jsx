import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, clearUser} from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const logout = () => {
    window.localStorage.removeItem('user')
    dispatch(clearUser())
    dispatch(notify('Goodbye', 'success'))
  }

  return (
    <div style={{
      display: 'flex',
      columnGap: '10px'
    }}>
      <Link to='/blogs'>blogs</Link>
      <Link to='/users'>users</Link>
      <span>{user.name} logged in</span>
      <button id="logout" onClick={logout}>logout</button>
    </div>
  )
}

export default NavBar