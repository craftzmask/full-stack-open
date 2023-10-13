import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

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

  const handleClick = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {
        sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleClick(anecdote)}>
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