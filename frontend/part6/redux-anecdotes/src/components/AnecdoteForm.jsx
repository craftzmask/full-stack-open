import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { set, remove } from '../reducers/notifyReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = e => {
    e.preventDefault()
    const anecdote =  e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(create(anecdote))
    notify(`Added ${anecdote.content}`)
  }

  const notify = message => {
    dispatch(set(message))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm