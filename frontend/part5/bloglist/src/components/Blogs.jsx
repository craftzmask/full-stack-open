import Blog from "./Blog/Blog"

const Blogs = ({ blogs, user, notify }) => {
  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            notify={notify} />
        ))}
    </div>
  )
}

export default Blogs;