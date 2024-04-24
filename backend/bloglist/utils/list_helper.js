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

module.exports = { dummy, totalLikes, favoriteBlog }