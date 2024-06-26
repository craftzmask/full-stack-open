import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = ({ notify }) => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`${newAnecdote.content} added`)
    },
    onError: err => notify(err.response.data.error)
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
