import { useSelector } from 'react-redux'
import { selectBlogs } from '../reducers/blogReducer'

const User = ({ user }) => {
  const blogs = useSelector(selectBlogs)

  if (!user) return null
  
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {
          blogs
            .filter(b => b.user.username === user.username)
            .map(b => <li key={b.id}>{b.title}</li>)
        }
      </ul>
    </div>
  )
}

export default User