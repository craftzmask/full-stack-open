import { Link } from "react-router-dom";

const Blogs = ({ blogs, user, notify }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(b =>
          <div style={blogStyle} key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </div>
        )
      }
    </div>
  )
}

export default Blogs;