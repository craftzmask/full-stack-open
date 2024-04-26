const _ = require('lodash')
const Blog = require('../models/blog')

const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs
    .reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  let mostVoteIndex = 0
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[mostVoteIndex].likes < blogs[i].likes) {
      mostVoteIndex = i
    }
  }

  return {
    title: blogs[mostVoteIndex].title,
    author: blogs[mostVoteIndex].author,
    likes: blogs[mostVoteIndex].likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  return _.chain(blogs)
    .countBy('author')
    .map((value, key) => ({
      author: key,
      blogs: value
    }))
    .maxBy('blogs')
    .value()
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      likes: _.sumBy(value, 'likes')
    }))
    .maxBy('likes')
    .value()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

module.exports = { 
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  blogs
}
