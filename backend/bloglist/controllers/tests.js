const testRouter = require('express').Router
const User = require('./users')
const Blog = require('./blogs')

testRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = testRouter