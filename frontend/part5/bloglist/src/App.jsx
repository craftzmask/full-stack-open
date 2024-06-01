import { useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog/Blog";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import { useNotificationDispatch } from "./reducers/NotificationReducer";
import { useQuery } from "@tanstack/react-query"
import UserContext from "./reducers/UserReducer";
import { Route, Routes, useMatch, Link } from "react-router-dom";
import { Layout, Button } from "antd";

const { Header, Content } = Layout;

const App = () => {
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
      <Content style={{
        height: "60vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h2>Log in to Application</h2>
        <Notification />
        <LoginForm notify={notify} />
      </Content>
    );
  }

  const style  = {
    marginRight: 10
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: "#b1bab3" }}>
        <Link style={style} to="/">blogs</Link>
        <Link style={style} to="/users">users</Link>
        <span>
          {user.name} logged in <Button type="primary" danger onClick={logout}>Logout</Button>
        </span>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <h2>blogs</h2>
        <Notification />

        <Togglable buttonLabel="New Blog" ref={newBlogFormRef}>
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
      </Content>
    </Layout>
  );
};

export default App;
