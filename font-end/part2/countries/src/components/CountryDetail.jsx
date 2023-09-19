const CountryDetail = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>

    <p><strong>languages</strong></p>
    <ul>
      {
        Object
          .values(country.languages)
          .map(l => <li key={l}>{l}</li>)
      }
    </ul>
    <img src={country.flags.svg} alt={country.flags.alt} width="150" />
  </div>
)

export default CountryDetail