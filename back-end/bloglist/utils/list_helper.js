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

module.exports = {
  dummy, totalLikes, favoriteBlog
}