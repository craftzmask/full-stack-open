import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = e => {
    e.preventDefault()
    if (persons.find(p => p.name === name)) {
      alert(`${name} is already added to phonebook`)
    } else {
      const personObject = { name, number }
      setPersons(persons.concat(personObject))
      setName('')
      setNumber('')
    }
  }

  const filteredPersons = persons.filter(p => {
    return filter
      ? p.name.toLowerCase().includes(filter.toLowerCase())
      : persons
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          number: <input
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App