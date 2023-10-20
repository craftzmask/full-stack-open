import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addComment(blog, { content }))
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='comment...'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button>add comment</button>
    </form>
  )
}

export default CommentForm