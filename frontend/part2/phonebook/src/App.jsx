import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [name, setName] = useState('')

  const addPerson = e => {
    e.preventDefault()
    if (persons.find(p => p.name === name)) {
      alert(`${name} is already added to phonebook`)
    } else {
      const personObject = { name: name }
      setPersons(persons.concat(personObject))
      setName('')
    }
  }

  const handleNameChange = e => {
    setName(e.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App