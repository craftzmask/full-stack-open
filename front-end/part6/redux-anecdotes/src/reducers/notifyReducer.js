import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notify',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return null
    }
  }
})

export const { set, remove }  = notifySlice.actions

export default notifySlice.reducer