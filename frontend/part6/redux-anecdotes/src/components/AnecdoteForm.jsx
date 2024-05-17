import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = e => {
    e.preventDefault()
    const anecdote =  e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(create(anecdote))
  }

  return (
    <form onSubmit={createAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm