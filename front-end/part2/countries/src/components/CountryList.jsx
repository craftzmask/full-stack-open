import { useEffect, useState } from 'react'

import CountryDetail from './CountryDetail'

const CountryList = ({ countries }) => {
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    setShownCountries(new Array(countries.length).fill(false))
  }, [countries])

  const handleClick = i => {
    const copy = [...shownCountries]
    copy[i] = !copy[i]
    setShownCountries(copy)
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map((country, i) => (
        <div key={country.name.official}>
          {country.name.common}

          <button onClick={() => handleClick(i)}>
            {shownCountries[i] ? 'collapse' : 'show'}
          </button>
          
          {shownCountries[i] ? <CountryDetail country={countries[i]} /> : null}
        </div>
      ))}
    </div>
  )
}

export default CountryList