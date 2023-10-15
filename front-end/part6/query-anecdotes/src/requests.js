import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios
  .get(baseUrl)
  .then(res => res.data)

export const createAnecdote = newAnecdote => axios
  .post(baseUrl, newAnecdote)
  .then(res => res.data)

export const updateAnecdote = anecdoteObject => axios
  .put(`${baseUrl}/${anecdoteObject.id}`, { 
    ...anecdoteObject,
    votes: anecdoteObject.votes + 1
  })
  .then(res => res.data)