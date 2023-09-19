import CountryDetail from './CountryDetail'

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    console.log(countries[0])
    return <CountryDetail country={countries[0]} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map(country => <div key={country.name.official}>{country.name.common}</div>)}
    </div>
  )
}

export default CountryList