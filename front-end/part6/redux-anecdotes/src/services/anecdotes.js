import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async anecdote => {
  const object = { content: anecdote, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const vote = async anecdote => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote, votes: anecdote.votes + 1
  })
  return res.data
}

export default { getAll, create, vote }