import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../reducers'
import { User } from '../../model/User'
import { userLogin, userLogout, userRegister, userUpdate } from './actions'
import { checkMessage } from '../lib/message'

export interface CurrentUser {
  _id: string
  email: string
  name: string
  status: number
  type: number
  photo_url?: string
  activeWorkout?: any
}

export interface AuthError {
  message: string
}

// Define a type for the slice state
interface UserState {
  isAuthenticated: boolean
  message?: string
  currentUser?: CurrentUser | any
  isLoading: boolean
  error: AuthError
}

// Define the initial state using that type
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  message: '',
  isLoading: false,
  error: { message: 'An Error occurred' },
} as UserState

const userSlice: any = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    userUpdate: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    login: () => {
      // state.currentUser = action.payload
    },
    clearActiveWorkout: (state: UserState) => {
      state.currentUser.activeWorkout = null
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.isLoading = false
    },
    updateWorkoutId: (state, { payload }) => {
      if (payload === null) {
        state.currentUser.activeWorkout = null
      } else {
        state.currentUser.activeWorkout = payload
      }
    },
  },
  extraReducers: {
    // user registration function states
    [userRegister.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      if (payload?.status === 200) {
        state.isAuthenticated = true
        state.currentUser = payload.data
        state.message = payload.message
        checkMessage(payload.status, payload.message)
        state.error = null
      } else {
        checkMessage(payload.status, payload.message)
      }
    },
    [userRegister.pending]: (state) => {
      state.currentUser = null
      state.message = null
      state.isAuthenticated = false
      state.isLoading = true
      state.error = null
    },
    [userRegister.rejected]: (state, { payload: loginPayload }) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.message = loginPayload.message
      state.isLoading = false
      state.error = { message: loginPayload.message }
      checkMessage(loginPayload.status, loginPayload.message)
    },
    // user update function states
    [userUpdate.fulfilled]: (state, { payload }) => {
      console.log("payload",payload)
      if (payload?.status === 200) {
        state.isAuthenticated = true
        state.currentUser = {...state.currentUser, ...payload.data}
        state.message = payload.message
        checkMessage(payload.status, payload.message)
        state.error = null
      } else {
        checkMessage(payload.status, payload.message)
      }
    },
    // user login function states
    [userLogin.fulfilled]: (LoginState, { payload: loginPayload }) => {
      LoginState.isLoading = false
      if (loginPayload.status === 200) {
        LoginState.isAuthenticated = true
        LoginState.currentUser = loginPayload.data
        LoginState.message = loginPayload.message
        checkMessage(loginPayload.status, loginPayload.message)
        LoginState.error = null
      } else {
        checkMessage(loginPayload.status, loginPayload.message)
      }
    },
    [userLogin.fulfilled]: (LoginState, { payload: loginPayload }) => {
      LoginState.isLoading = false
      if (loginPayload.status === 200) {
        LoginState.isAuthenticated = true
        LoginState.currentUser = loginPayload.data
        LoginState.message = loginPayload.message
        checkMessage(loginPayload.status, loginPayload.message)
        LoginState.error = null
      } else {
        checkMessage(loginPayload.status, loginPayload.message)
      }
    },
    [userLogin.pending]: (LoginState) => {
      LoginState.currentUser = null
      LoginState.message = null
      LoginState.isAuthenticated = false
      LoginState.isLoading = true
      LoginState.error = null
    },
    [userLogin.rejected]: (state, { payload }) => {
      checkMessage(payload.status, payload.message)
      state.currentUser = null
      state.isAuthenticated = false
      state.message = payload.message
      state.isLoading = false
      state.error = { message: payload.message }
    },
    // user logout function states
    [userLogout.fulfilled]: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.message = null
      state.isLoading = false
      state.error = null
    },
    [userLogout.pending]: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.message = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const { login, logout, clearActiveWorkout, updateWorkoutId } =
  userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount: any = (state: RootState) => state.users

export default userSlice.reducer
