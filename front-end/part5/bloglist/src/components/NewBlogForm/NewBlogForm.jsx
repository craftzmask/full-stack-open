import { useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient, useMutation } from "@tanstack/react-query"
import blogService from "../../services/blogs"
import { Button, Form, Input } from "antd";

const NewBlogForm = ({ notify, newBlogFormRef }) => {
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

  const handleSubmit = async (values) => {
    const { title, author, url } = values
    newBlogMutation.mutate({ title, author, url })
  };

  return (
    <Form
      style={{ minWidth: 400 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title!"
          }
        ]}
      >
        <Input
          placeholder="Title"
          data-testid="title" />
      </Form.Item>

      <Form.Item
        name="author"
        rules={[
          {
            required: true,
            message: "Please input the author!"
          }
        ]}
      >
        <Input
          placeholder="Author"
          data-testid="author" />
      </Form.Item>

      <Form.Item
        name="url"
        rules={[
          {
            required: true,
            message: "Please input the URL!"
          }
        ]}
      >
        <Input
          placeholder="URL"
          data-testid="url" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

NewBlogForm.propTypes = {
  notify: PropTypes.func.isRequired,
};

export default NewBlogForm;

/*
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
*/