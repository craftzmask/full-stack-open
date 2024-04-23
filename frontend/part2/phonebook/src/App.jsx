import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  const filteredPersons = persons.filter(p => {
    return filter
      ? p.name.toLowerCase().includes(filter.toLowerCase())
      : persons
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const notify = (message, status) => {
    setMessage(message)
    setStatus(status)

    setTimeout(() => {
      setMessage(null)
      setStatus(null)
    }, 5000)
  }

  const clearForm = () => {
    setName('')
    setNumber('')
  }

  const addPerson = e => {
    e.preventDefault()

    const personObject = { name, number }

    const foundPerson = persons.find(p => p.name === name)
    if (foundPerson) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(foundPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            clearForm()
            notify(`Updated ${updatedPerson.name}'s number successfully`, 'success')
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== foundPerson.id))
            notify(`Information of ${foundPerson.name} has been removed from the server`, 'error')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          clearForm()
          notify(`Added a new person named ${createdPerson.name} successfully`, 'success')
        })
        .catch(err => {
          notify(`${err.response.data.error}`, 'error')
        })
    }
  }

  const deletePerson = personToDelete => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(personToDelete.id)
        .then(() =>
          setPersons(persons.filter(p => p.id !== personToDelete.id))
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />

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