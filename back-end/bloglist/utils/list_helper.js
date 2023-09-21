const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (!blogs.length) return null

  let mostLikeIndex = 0
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[mostLikeIndex].likes < blogs[i].likes) {
      mostLikeIndex = i
    }
  }

  return {
    title: blogs[mostLikeIndex].title,
    author: blogs[mostLikeIndex].author,
    likes: blogs[mostLikeIndex].likes
  }
}

const mostBlogs = blogs => {
  if (!blogs) return null

  return _.chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value()
}

const mostLikes = blogs => {
  if (!blogs) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    .maxBy('likes')
    .value()
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}