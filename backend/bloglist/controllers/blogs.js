const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})

  if (!(body.title && body.url)) {
    return response.status(400).send({
      error: 'missing title or url'
    })
  }

  const blog = new Blog({
    ...body,
    userId: users[0]._id,
    likes: body.likes ? body.likes : 0
  })

  const savedBlog = await blog.save()
  
  users[0].blogs = users[0].blogs.concat(savedBlog)
  await users[0].save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, request.body, { new: true }
  )
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
