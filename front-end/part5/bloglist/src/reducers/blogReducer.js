import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogSlide = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    like: (state, action) => {
      const id = action.payload.id
      return state.map(s => s.id !== id ? s : action.payload)
    },
    createBlog: (state, action) => {
      state.push(action.payload)
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      return state.filter(s => s.id !== id)
    },
    createComment: (state, action) => {
      const blog = state.find(s => s.id === action.payload.blog)
      blog.comments.push(action.payload)
      return state
    }
  }
})

export const { setBlogs, createBlog, deleteBlog, like, createComment } = blogSlide.actions

export const likeBLog = blog => {
  return async dispatch => {
    const { user, ...rest } = blog
    const blogToLike = await blogService.update(
      { ...rest, likes: rest.likes + 1 }
    )
    blogToLike.user = user
    dispatch(like(blogToLike))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const savedComment = await blogService.postComment(blog.id, comment)
    dispatch(createComment(savedComment))
  }
}

export const selectBlogs = state => state.blogs

export default blogSlide.reducer