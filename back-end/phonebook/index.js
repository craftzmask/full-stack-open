const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const baseUrl = '/api/persons'

app.get(baseUrl, (req, res) => {
  res.json(persons)
})

app.get(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id)
  const found = persons.find(p => p.id === id)
  if (!found) return res.status(404).end()
  res.json(found)
})

app.post(baseUrl, (req, res) => {
  const person = req.body
  
  if (!(person.name && person.number)) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({
      error: 'The name already exists in the phonebook'
    })
  }

  person.id = Math.floor(Math.random() * 1000000)
  persons = persons.concat(person)
  res.json(person)
})

app.delete(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).json(persons)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})