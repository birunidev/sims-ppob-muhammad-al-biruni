import { createSlice } from '@reduxjs/toolkit'

interface AuthStoreType {
  isAuth: boolean
  token: string | null
  user: {
    email: string
    first_name: string
    last_name: string
    profile_image: string
    balance: number
  } | null
}

const initialState: AuthStoreType = {
  isAuth: false,
  token: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, setAuth } = authSlice.actions

export default authSlice.reducer
