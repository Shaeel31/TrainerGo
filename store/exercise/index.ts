import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

message.config({
  top: 400,
  duration: 1,
  maxCount: 3,
  rtl: false,
})

// Define a type for the slice state
interface ExerciseState {}

// Define the initial state using that type
const initialState = {} as ExerciseState

const exerciseSlice: any = createSlice({
  name: 'exerciseSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: {},
})

export const {} = exerciseSlice.actions
export default exerciseSlice.reducer
