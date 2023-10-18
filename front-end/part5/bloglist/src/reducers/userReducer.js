import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (state, action) => action.payload,
    clear: state => null
  }
})

export const { set, clear } = userSlice.actions

export const setUser = user => {
  return async dispatch => dispatch(set(user))
}

export const clearUser = () => {
  return dispatch => dispatch(clear())
}

export const selectUser = state => state.user

export default userSlice.reducer