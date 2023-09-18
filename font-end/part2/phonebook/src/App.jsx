import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

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

      <form onSubmit={addName}>
        <div>
          name <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          number <input value={number} onChange={e => setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </>
  )
}

export default App
