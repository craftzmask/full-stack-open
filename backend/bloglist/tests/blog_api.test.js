const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('khanhchung', 10)
  const user = new User({
    username: 'khanhchung',
    name: 'Khanh Chung',
    passwordHash
  })

  const savedUser = await user.save()

  await Blog.deleteMany({})
  const blogs = helper.blogs.map(b => {
    b.userId = savedUser._id
    return new Blog(b)
  })
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
  const blog = blogs[0]
  blog.userId = blog.userId._id.toString()

  const response = await api
    .get(`/api/blogs/${blogs[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(response.body, blogs[0])
})

test('post a valid blog', async () => {
  let response = await api
    .post('/api/login')
    .send({ username: 'khanhchung', password: 'khanhchung' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(helper.blogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.blogs.length + 1)

  const titles = response.body.map(b => b.title)
  assert(titles.includes(helper.blogs[0].title))
})

test('missing likes property will automatically set it to 0', async () => {
  let response = await api
    .post('/api/login')
    .send({ username: 'khanhchung', password: 'khanhchung' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blog = helper.blogs[0]
  delete blog.likes

  response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('cannot create blog without title or url', async () => {
  let response = await api
    .post('/api/login')
    .send({ username: 'khanhchung', password: 'khanhchung' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  let blog = helper.blogs[0]
  delete blog.title

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(blog)
    .expect(400)

  blog = helper.blogs[0]
  delete blog.url

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${response.body.token}`)
    .send(blog)
    .expect(400)

  response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})

test("a valid blog can be updated", async () => {
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

  let response = await api
    .post('/api/login')
    .send({ username: 'khanhchung', password: 'khanhchung' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${blog.id}`)
    .set('Authorization', `Bearer ${response.body.token}`)
    .expect(204)

  response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length - 1)

  const titles = response.body.map(b => b.title)
  assert(!titles.includes(blog.title))
})

after(async () => {
  await mongoose.connection.close()
})