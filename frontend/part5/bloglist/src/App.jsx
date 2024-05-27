import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog/Blog";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import { useNotificationDispatch } from "./reducers/NotificationReducer";
import { useQuery } from "@tanstack/react-query"
import UserContext from "./reducers/UserReducer";
import { Route, Routes, useMatch } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, userDispatch] = useContext(UserContext)
  const newBlogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch()
  const blogMatch = useMatch("/blogs/:id")

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      userDispatch({ type: "SET", payload: user })
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  const blogs = result.data

  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      userDispatch({ type: "SET", payload: user })
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      notify("logged in successful", "success");
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  const logout = () => {
    localStorage.clear();
    userDispatch({ type: "CLEAR" })
  };

  const notify = (message, status) => {
    notificationDispatch({ type: "SET", payload: { message, status } })
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" })
    }, 5000);
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          onUsernameChange={(e) => setUsername(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={login}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <h2>create new</h2>
        <NewBlogForm
          notify={notify}
          newBlogFormRef={newBlogFormRef} />
      </Togglable>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Blogs blogs={blogs} user={user} notify={notify} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} user={user} notify={notify} />} />
      </Routes>
    </div>
  );
};

export default App;
