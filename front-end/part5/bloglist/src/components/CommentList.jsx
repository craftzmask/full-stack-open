import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const CommentList = ({ blog }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    blogService
      .getComments(blog.id)
      .then(comments => setComments(comments))
  }, [blog])

  return (
    <ul>
      {comments.map(c => <li key={c.id}>{c.content}</li>)}
    </ul>
  )
}

export default CommentList