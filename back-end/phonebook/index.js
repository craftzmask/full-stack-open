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

app.get(`${baseUrl}/:id`, (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(data => {
      if (data) {
        res.json(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.post(baseUrl, (req, res, next) => {
  const person = new Person(req.body)
  person
    .save()
    .then(data => res.json(data))
    .catch(err => next(err))
})

app.put(`${baseUrl}/:id`, (req, res, next) => {
  Person
    .findByIdAndUpdate(
      req.params.id,
      { number: req.body.number },
      { new: true, runValidators: true, context: 'query' }
    )
    .then(data => res.json(data))
    .catch(err => next(err))
})

app.delete(`${baseUrl}/:id`, (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  Person.find({}).then(data => {
    res.send(`
      <p>Phonebook has info for ${data.length} people</p>
      <p>${new Date()}</p>
    `)
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ err: err.message })
  }

  next(err)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})