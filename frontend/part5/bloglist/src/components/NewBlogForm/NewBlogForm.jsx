import { useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import blogService from "../../services/blogs"

const NewBlogForm = ({ notify, newBlogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (savedBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      notify(`${savedBlog.title} by ${savedBlog.author} added`, "success");
      newBlogFormRef.current.toggleVisibility();
    },
    onError: (error) => {
      notify(error.response.data.error, "error");
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    newBlogMutation.mutate({ title, author, url })
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <div>
        title:{" "}
        <input
          data-testid="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          data-testid="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          data-testid="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit" className="create-blog">
        create
      </button>
    </form>
  );
};

NewBlogForm.propTypes = {
  notify: PropTypes.func.isRequired,
};

export default NewBlogForm;
