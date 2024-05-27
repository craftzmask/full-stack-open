import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs"

const Blog = ({ blog, user, notify }) => {
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

  if (!blog) return null

  return (
    <div className="blog">
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span data-testid="likes">{blog.likes} likes</span>
        <button onClick={like} className="like">likes</button>
      </div>
      <div>added by {blog.user.name}</div>

      <div>
        {blog.user.username === user.username
          ? <button onClick={remove}>remove</button>
          : null
        }
      </div>
    </div>
  );
};

Blog.propTypes = {
  notify: PropTypes.func.isRequired
};

export default Blog;
