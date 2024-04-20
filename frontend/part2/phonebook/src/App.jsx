import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-123123' }
  ]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const addPerson = e => {
    e.preventDefault()
    if (persons.find(p => p.name === name)) {
      alert(`${name} is already added to phonebook`)
    } else {
      const personObject = { name, number }
      setPersons(persons.concat(personObject))
      setName('')
    }
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleNumberChange = e => {
    setNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={number}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App