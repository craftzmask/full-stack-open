import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = ''
      return state
    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer