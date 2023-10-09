import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state
      .anecdotes
      .filter(s => s
        .content
        .toLowerCase()
        .includes(state.filter.toLowerCase())
      )
  })
  const dispatch = useDispatch()
  const sortedAnecdotes = anecdotes.sort((a, b) => a.votes - b.votes)

  return (
    <div>
      {
        sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
                vote
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList