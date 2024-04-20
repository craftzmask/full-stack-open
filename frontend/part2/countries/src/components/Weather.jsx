import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api = import.meta.env.VITE_SOME_KEY
  const icon = weather?.weather[0].icon

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api}&units=metric`)
      .then(res => setWeather(res.data))
  }, [country])

  if (!weather) return null

  return (
    <div>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather'icon" />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather