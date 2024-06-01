import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs";
import { Button, Form, Input } from "antd";

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

  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    }
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

  const addComment = values => {
    const { comment } = values
    console.log(comment)
    addCommentMutation.mutate({
      id: blog.id,
      comment: { content: comment }
    })
  }

  if (!blog) return null

  return (
    <div className="blog">
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span data-testid="likes">{blog.likes} likes</span>{" "}
        <Button type="primary" onClick={like} className="like">
          likes
        </Button>
      </div>
      <div>added by {blog.user.name}</div>

      <div>
        {blog.user.username === user.username
          ? <Button danger onClick={remove}>remove</Button>
          : null
        }
      </div>

      <h3>comments</h3>
      <NewComment onSubmit={addComment} />
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  );
};

const NewComment = ({ onSubmit }) => {
  return (
    <Form style={{ maxWidth: 300 }} onFinish={onSubmit}>
      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            message: "Please input your comment!"
          }
        ]}
      >
        <Input placeholder="Comment" />
      </Form.Item>
      <Button htmlType="submit">add comment</Button>
    </Form>
  )
}

Blog.propTypes = {
  notify: PropTypes.func.isRequired
};

export default Blog;
