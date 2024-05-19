import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { set, remove } from '../reducers/notifyReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const anecdote =  e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch(create(newAnecdote))
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
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm