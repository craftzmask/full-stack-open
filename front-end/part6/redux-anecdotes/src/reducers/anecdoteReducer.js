import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(s => s.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(s => s.id !== id ? s : votedAnecdote)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, voteAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer