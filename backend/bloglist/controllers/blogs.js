const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  if (!(body.title && body.url)) {
    return response.status(400).send({
      error: 'missing title or url'
    })
  }

  const user = request.user

  const blog = new Blog({
    ...body,
    user: user._id,
    likes: body.likes ? body.likes : 0
  })

  let savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  savedBlog = await Blog.findById(savedBlog._id).populate('user')

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, request.body, { new: true }
  ).populate('user')

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user
  if (blogToDelete.user.toString() === user._id.toString()) {
    user.blogs = user.blogs.filter(b => b.id !== request.params.id)
    await user.save()
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  return response.status(401).send({ error: 'Unauthorized' })
})

module.exports = blogsRouter
