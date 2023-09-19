import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = where => {
  const req = axios.get(`${baseUrl}?q=${where}&units=metric&appid=${apiKey}`)
  return req.then(res => res.data)
}

export default { getWeather }