import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async id => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return res.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const getComments = async id => {
  const res = await axios.get(`${baseUrl}/${id}/comments`)
  return res.data
}

const postComment = async (id, newComment) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/${id}/comments`, newComment, config)
  return res.data
}

export default { getAll, getById, create, update, remove, getComments, postComment, setToken }