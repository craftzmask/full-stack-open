const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const { usersInDb } = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('khanhchung', 10)
  const user = new User({
    username: 'khanhchung',
    name: 'Khanh Chung',
    passwordHash
  })

  await user.save()
})

describe('invalid user cannot be created', () => {
  test('missing username or password recieves status 400 code', async () => {
    const usersAtStart = await usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'khanh', name: 'khanh' })
      .expect(400)

    await api
      .post('/api/users')
      .send({ name: 'khanh', password: 'khanh' })
      .expect(400)
  
    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('username must be unique', async () => {
    const usersAtStart = await usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'khanhchung', name: 'Khanh Chung', password: 'khanhchung'})
      .expect(400)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})