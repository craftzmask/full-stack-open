import axios from 'axios'

const baseUrl = '/api/login'

const login = async userObject => {
  const res = await axios.post(baseUrl, userObject)
  return res.data
}

export default { login }