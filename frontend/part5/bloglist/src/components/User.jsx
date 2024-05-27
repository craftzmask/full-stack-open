import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userService from "../services/user";

const User = () => {
  const { id } = useParams();

  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  const users = result.data

  const user = users.find(u => u.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>added blogs</strong>
      </p>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User