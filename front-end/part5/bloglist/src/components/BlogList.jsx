import Blog from './Blog/Blog'

const BlogList = ({ blogs, user, likeClick, removeClick }) => (
  <div id="bloglist">
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