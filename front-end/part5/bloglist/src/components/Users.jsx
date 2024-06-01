import { useQuery } from "@tanstack/react-query";
import userService from "../services/user";
import { Link, useMatch } from "react-router-dom";

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  const users = result.data

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map(u => {
            return <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users;