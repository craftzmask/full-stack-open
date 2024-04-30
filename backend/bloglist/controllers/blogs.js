const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!request.token) {
    return response.status(401).send({
      error: 'invalid token'
    })
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).send({
        error: 'invalid token'
      })
    }

    const user = await User.findById(decodedToken.id)

    if (!(body.title && body.url)) {
      return response.status(400).send({
        error: 'missing title or url'
      })
    }
  
    const blog = new Blog({
      ...body,
      userId: user._id,
      likes: body.likes ? body.likes : 0
    })
  
    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
  
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
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
