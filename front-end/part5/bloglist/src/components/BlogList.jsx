import Blog from './Blog'

const BlogList = ({ blogs, likeClick }) => (
  <div>
    {
      blogs.map(blog => <Blog key={blog.id} blog={blog} likeClick={likeClick} />)
    }
  </div>
)

export default BlogList