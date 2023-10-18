import { createSlice } from '@reduxjs/toolkit'

export const notificationSlide = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    status: ''
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.status = action.payload.status
    },
    clearNotification: state => {
      state.message = ''
      state.status = ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlide.actions

export const notify = (message, status, seconds = 5) => dispatch => {
  dispatch(setNotification({ message, status }))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

export const selectNotification = state => state.notification

export default notificationSlide.reducer