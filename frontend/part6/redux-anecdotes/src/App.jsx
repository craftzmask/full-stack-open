import { useSelector, useDispatch } from 'react-redux'
import { vote, create } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.toSorted((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()
  
  const voteAnecdote = (id) => {
    dispatch(vote(id))
  }

  const createAnecdote = e => {
    e.preventDefault()
    const anecdote =  e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(create(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App