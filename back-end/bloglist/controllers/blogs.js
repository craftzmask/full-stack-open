const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).send({ err: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    ...req.body,
    user: user._id
  })

  blog.likes = blog.likes ?? 0
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).send({ err: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)

  const blogToDelete = await Blog.findById(req.params.id)
  if (user.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  }

  res.status(401).send({ err: 'unauthorized' })
})

module.exports = blogsRouter