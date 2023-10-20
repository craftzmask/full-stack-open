const User = ({ user }) => {
  return (
    <tr>
      <td>
        {user.name ?? user.username}
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const UserList = ({ users }) => {
  return (
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
  )
}

export default UserList