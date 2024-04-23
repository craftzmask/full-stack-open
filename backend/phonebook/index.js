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

const baseUrl = '/api/persons'

app.get(baseUrl, (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
})

app.get(`${baseUrl}/:id`, (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.post(baseUrl, (req, res, next) => {
  const body = req.body

  if (!(body.name && body.number)) {
    return res.status(400).json({
      error: 'missing name or number'
    })
  }

  const person = new Person({ ...body })
  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(err => next(err))
})

app.put(`${baseUrl}/:id`, (req, res, next) => {
  Person
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err))
})

app.delete(`${baseUrl}/:id`, (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(
      `
        <div>
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${Date()}</p>
        </div>
      `
    )
  })
})


const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})