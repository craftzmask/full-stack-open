const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

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
  res.json(persons)
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

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name is already existed'
    })
  }

  const id = Math.floor(Math.random() * 10000000)
  const newPerson = { ...body, id }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})