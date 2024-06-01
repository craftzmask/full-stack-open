import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { set, remove } from '../reducers/notifyReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state
        .anecdotes
        .toSorted((a, b) => b.votes - a.votes)
    }
    return state
      .anecdotes
      .filter(s => s.content.toLowerCase().includes(state.filter.toLowerCase()))
      .toSorted((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    notify(`you voted ${anecdote.content}`)
  }

  const notify = message => {
    dispatch(set(message))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList