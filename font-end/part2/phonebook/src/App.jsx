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

  const addPerson = e => {
    e.preventDefault()

    const found = persons.find(p => p.name === name)
    if (found) {
      if (confirm(`${name} is already added to phonebook, replace old number wih a new one?`)) {
        personService
          .update(found.id, { ...found, number })
          .then(data => {
            setPersons(persons.map(p => p.name !== name ? p : data))
            setName('')
            setNumber('')
          })
      }
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

  const remove = person => {
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <SearchFilter value={query} onChange={e => setQuery(e.target.value)} />

      <h3>add a new</h3>
      <AddForm
        onSubmit={addPerson}
        name={name}
        onNameChange={e => setName(e.target.value)}
        number={number}
        onNumberChange={e => setNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <PersonList persons={filteredPersons} onRemove={remove} />
    </>
  )
}

export default App
