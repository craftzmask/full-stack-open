import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs"

const Blog = ({ blog, user, notify }) => {
  const [visiable, setVisible] = useState(false);
  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      notify(`${updatedBlog.title} by ${updatedBlog.author} liked`, "success");
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      notify(`${blog.title} by ${blog.author} removed`, "success");
    },
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const like = () => {
    likeBlogMutation.mutate({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const remove = () => {
    removeBlogMutation.mutate(blog.id)
  }

  return (
    <div style={blogStyle} className="blog">
      <span>
        {blog.title} by {blog.author}
      </span>
      <div style={{ display: visiable ? "" : "none" }} className="blog-details">
        <div>{blog.url}</div>
        <div>
          <span data-testid="likes">{blog.likes} likes</span>
          <button onClick={like} className="like">
            likes
          </button>
        </div>
        <div>{blog.user?.name}</div>
        {blog.user.username === user.username ? (
          <button onClick={remove}>remove</button>
        ) : null}
      </div>
      <button onClick={() => setVisible(!visiable)} className="show-details">
        {visiable ? "hide" : "view"}
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired
};

export default Blog;
