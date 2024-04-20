import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data))
  }, [])

  const filteredCountries = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : []

  return (
    <>
      <div>
        find countries <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <Countries countries={filteredCountries} showCountry={setFilter} />
    </>
  )
}

export default App
