import Blog from './Blog'

const BlogList = ({ blogs, user, likeClick, removeClick }) => (
  <div>
    {
      blogs.map(blog => <Blog
        key={blog.id}
        blog={blog}
        user={user}
        likeClick={likeClick}
        removeClick={removeClick}
      />)
    }
  </div>
)

export default BlogList