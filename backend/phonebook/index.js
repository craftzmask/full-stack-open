require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

const baseUrl = '/api/persons'

app.get(baseUrl, (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
})

app.get(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id)
  const found = persons.find(p => p.id === id)
  
  if (found) {
    res.json(found)
  } else {
    res.status(404).end()
  }
})

app.post(baseUrl, (req, res) => {
  const body = req.body

  if (!(body.name && body.number)) {
    return res.status(400).json({
      error: 'missing name or number'
    })
  }

  const person = new Person({ ...body })
  person.save()
    .then(savedPerson => res.json(savedPerson))
})

app.delete(`${baseUrl}/:id`, (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  res.send(
    `
      <div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
      </div>
    `
  )
})


const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})