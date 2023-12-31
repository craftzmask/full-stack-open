const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  let res = await api
    .post('/api/login')
    .send({ username: 'root', password: 'root' })
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  token = res.body.token
})

test('blogs are returned as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  expect(res.body.length).toBe(blogs.length)
})

test('every blog should have id instead of _id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  res.body.map(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be posted', async () => {
  const res = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd.length).toBe(blogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Type wars')
})

test('a blog will default to 0 if likes property is missing', async () => {
  const res = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  expect(res.body.likes).toBe(0)
})

test('cannot not post a blog without title or url', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    })
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: "Type wars",
      author: "Robert C. Martin",
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test("delete a blog by providing it's valid id", async () => {
  const blogsAtStart = await blogsInDb()

  const res = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Go To Statement Considered Harmful P2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    })
    .expect(201)
  
  let blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

  const blogToDelete = res.body

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test("update a blog's likes", async () => {
  const blogsAtStart = await blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const res = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 10 })
    .expect(200)

  const updatedBlog = res.body
  expect(updatedBlog.likes).toBeDefined()
  expect(updatedBlog.likes).toBe(10)
})

afterAll(async () => {
  await mongoose.connection.close()
})