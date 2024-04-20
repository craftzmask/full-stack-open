import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter(p => {
    return filter
      ? p.name.toLowerCase().includes(filter.toLowerCase())
      : persons
  })

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const addPerson = e => {
    e.preventDefault()

    const personObject = { name, number }

    const foundPerson = persons.find(p => p.name === name)
    if (foundPerson) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        axios
          .put(`http://localhost:3001/persons/${foundPerson.id}`, personObject)
          .then(res => setPersons(persons.map(p => p.id !== res.data.id ? p : res.data)))
        setName('')
        setNumber('')
      }
    } else {
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(res => {
          setPersons(persons.concat(res.data))
          setName('')
          setNumber('')
        })
    }
  }

  const deletePerson = personToDelete => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${personToDelete.id}`)
        .then(() =>
          setPersons(persons.filter(p => p.id !== personToDelete.id))
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      <AddPersonForm
        onSubmit={addPerson}
        name={name} setName={setName}
        number={number} setNumber={setNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson}/>
    </div>
  )
}

export default App