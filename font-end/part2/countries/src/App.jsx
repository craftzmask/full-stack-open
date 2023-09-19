import { useEffect, useState } from 'react'

import countryService from './services/countries'

import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const filteredCountries = countries.filter(c => {
    const countryName = c.name.common.toLowerCase()
    return filter && countryName.includes(filter.toLowerCase())
  })

  useEffect(() => {
    countryService
      .getAll()
      .then(data => setCountries(data))
  }, [])

  return (
    <>
      <div>
        find countries<input value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      <CountryList countries={filteredCountries} />
    </>
  )
}

export default App
