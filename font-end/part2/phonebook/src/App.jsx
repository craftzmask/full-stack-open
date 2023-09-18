import { useEffect, useState } from 'react'
import axios from 'axios'

import personService from './services/persons'

import SearchFilter from './components/SearchFilter'
import AddForm from './components/AddForm'
import PersonList from './components/PersonList'

function App() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

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
      personService
        .create({ name, number })
        .then(data => {
          setPersons(persons.concat(data))
          setName('')
          setNumber('')
        })
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
