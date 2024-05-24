import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const onReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const omit = (key, object) => {
    const { [key]: _, ...rest } = object
    return rest
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...omit('reset', content)} />
        </div>
        <div>
          author
          <input name='author' {...omit('reset', author)} />
        </div>
        <div>
          url for more info
          <input name='info' {...omit('reset', info)} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={onReset}>
          reset
        </button>
      </form>
    </div>
  )
}


export default CreateNew