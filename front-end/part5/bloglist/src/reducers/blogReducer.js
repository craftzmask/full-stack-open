import { createSlice } from '@reduxjs/toolkit'

const blogSlide = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    createBlog: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, createBlog } = blogSlide.actions

export const selectBlogs = state => state.blogs

export default blogSlide.reducer