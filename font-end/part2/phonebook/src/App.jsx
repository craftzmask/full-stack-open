import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [name, setName] = useState('')
  const addName = e => {
    e.preventDefault()

    if (persons.find(p => p.name === name)) {
      alert(`${name} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name }))
      setName('')
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name <input value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(p => <div key={p.name}>{p.name}</div>)}
    </>
  )
}

export default App
