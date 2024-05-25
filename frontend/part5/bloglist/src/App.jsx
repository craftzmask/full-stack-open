import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotificationDispatch } from "./reducers/NotificationReducer";
import { useQuery } from "@tanstack/react-query"

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const newBlogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  const blogs = result.data

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
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
    setUser(null);
  };

  const notify = (message, status) => {
    notificationDispatch({ type: "SET", payload: { message, status } })
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" })
    }, 5000);
  };

  const handleLikeClick = async (blog) => {
    const updated = await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });

    setBlogs(blogs.map((b) => (b.id !== updated.id ? b : updated)));
  };

  const handleDeleteClick = async (blog) => {
    if (confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        notify(exception.response.data.error, "error");
      }
    }
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

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onLike={handleLikeClick}
            onDelete={handleDeleteClick} />
        ))}
    </div>
  );
};

export default App;
