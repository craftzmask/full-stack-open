import { useSelector } from 'react-redux'
import { selectBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(selectBlogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div id="bloglist">
      {
        sortedBlogs.map(b => {
          return (
            <div 
              key={b.id}
              style={{
                border: '2px solid black',
                marginTop: '10px',
                padding: '10px'
            }}>
              <Link to={`/blogs/${b.id}`}>{b.title} by {b.author}</Link>
            </div>
          )
        })
      }
    </div>
  )
}
export default BlogList