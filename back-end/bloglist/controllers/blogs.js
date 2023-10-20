const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1})

  res.json(blogs)
})

blogsRouter.post('/', userExtractor,  async (req, res) => {
  const user = req.user

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

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user

  const blogToDelete = await Blog.findById(req.params.id)
  if (user.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  }

  res.status(401).send({ err: 'unauthorized' })
})

blogsRouter.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find({ blog: req.params.id })
  res.json(comments)
})

blogsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const comment = new Comment({
    ...req.body,
    blog: blog._id
  })

  blog.comments.push(comment)
  await blog.save()

  const savedComment = await comment.save()
  res.status(201).json(savedComment)
})
module.exports = blogsRouter