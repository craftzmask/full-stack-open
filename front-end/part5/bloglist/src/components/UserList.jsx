import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name ?? user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => <User key={u.id} user={u} />)}
        </tbody>
      </table>
    </div>
  )
}

export default UserList