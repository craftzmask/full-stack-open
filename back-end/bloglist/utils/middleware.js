const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).send({ err: 'token invalid' })
  }
  req.user = await User.findById(decodedToken.id)
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.err(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ err: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ err: err.message })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}