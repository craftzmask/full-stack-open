import { useSelector } from 'react-redux'
import Blog from './Blog/Blog'
import { selectBlogs } from '../reducers/blogReducer'

const BlogList = ({ user, likeClick, removeClick }) => {
  const blogs = useSelector(selectBlogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div id="bloglist">
      {
        sortedBlogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          user={user}
          likeClick={likeClick}
          removeClick={removeClick}
        />)
      }
    </div>
  )
}
export default BlogList