const NewBlogForm = ({
  title, onTitleChange,
  author, onAuthorChange,
  url, onUrlChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        title: <input
          value={title}
          onChange={onTitleChange}
        />
      </div>
      <div>
        author: <input
          value={author}
          onChange={onAuthorChange}
        />
      </div>
      <div>
        url: <input
          value={url}
          onChange={onUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm