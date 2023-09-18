import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import AddForm from './components/AddForm'
import PersonList from './components/PersonList'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [query, setQuery] = useState('')

  const filteredPersons = persons.filter(p => {
    const pName = p.name.toLowerCase()
    const q = query.toLowerCase()
    return pName.includes(q)
  })

  const addName = e => {
    e.preventDefault()

    if (persons.find(p => p.name === name)) {
      alert(`${name} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name, number }))
      setName('')
      setNumber('')
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <SearchFilter value={query} onChange={e => setQuery(e.target.value)} />

      <h3>add a new</h3>
      <AddForm
        onSubmit={addName}
        name={name}
        onNameChange={e => setName(e.target.value)}
        number={number}
        onNumberChange={e => setNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <PersonList persons={filteredPersons} />
    </>
  )
}

export default App
