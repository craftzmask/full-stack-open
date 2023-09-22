const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('root', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('users as json', async () => {
  const res = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body).toHaveLength(1)
})

test('create a username with a fresh username', async () => {
  const usersAtStart = await usersInDb()
  
  const user = {
    username: 'admin',
    name: 'admin',
    password: 'admin' 
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain('admin')
})

test('invalid user cannot be created', async () => {
  const usersAtStart = await usersInDb()

  // missing password
  let result = await api
    .post('/api/users')
    .send({ username: 'admin' })
    .expect(400)
  expect(result.body.err).toContain('expected password must be at least 3 characters')

  // password too short
  result = await api
    .post('/api/users')
    .send({ username: 'admin', password: 'ab' })
    .expect(400)
  expect(result.body.err).toContain('expected password must be at least 3 characters')

  // missing username
  result = await api
    .post('/api/users')
    .send({ password: 'admin' })
    .expect(400)
  expect(result.body.err).toContain('expected username must be at least 3 characters')
    
  // username too short
  result = await api
    .post('/api/users')
    .send({ username: 'ab', password: 'admin' })
    .expect(400)
  expect(result.body.err).toContain('expected username must be at least 3 characters')

  // username must be unique
  result = await api
    .post('/api/users')
    .send({ username: 'root', password: 'root' })
    .expect(400)
  expect(result.body.err).toContain('expected `username` to be unique')


  const usersAtEnd = await usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})