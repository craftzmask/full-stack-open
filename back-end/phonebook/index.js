require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req, res) => {
  const { id, ...rest } = req.body
  return JSON.stringify(rest)
})

const baseUrl = '/api/persons'

app.get(baseUrl, (req, res) => {
  Person
    .find({})
    .then(data => res.json(data))
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})