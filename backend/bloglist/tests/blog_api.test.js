const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = helper.blogs.map(b => new Blog(b))
  const promisedBlogs = blogs.map(b => b.save())
  await Promise.all(promisedBlogs)
})

test('get all blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('get blog by id', async () => {
  const blogs = await helper.blogsInDb()
  const response = await api
    .get(`/api/blogs/${blogs[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.deepStrictEqual(response.body, blogs[0])
})

test('post a valid blog', async () => {
  await api
    .post('/api/blogs')
    .send(helper.blogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.blogs.length + 1)

  const titles = response.body.map(b => b.title)
  assert(titles.includes(helper.blogs[0].title))
})

test('missing likes property will automatically set it to 0', async () => {
  const blog = helper.blogs[0]
  delete blog.likes

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('cannot create blog without title or url', async () => {
  let blog = helper.blogs[0]
  delete blog.title

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  blog = helper.blogs[0]
  delete blog.url

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})

test.only("a valid blog can be updated", async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]

  const response = await api
    .put(`/api/blogs/${blog.id}`)
    .send({
      ...blog,
      likes: blog.likes + 1
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blog.likes + 1)
})

test('delete valid blog', async () => {
  const blogs = await helper.blogsInDb()
  const blog = blogs[0]

  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length - 1)

  const titles = response.body.map(b => b.title)
  assert(!titles.includes(blog.title))
})

after(async () => {
  await mongoose.connection.close()
})