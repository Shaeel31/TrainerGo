import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

message.config({
  top: 400,
  duration: 1,
  maxCount: 3,
  rtl: false,
})

// Define a type for the slice state
interface BlockState {}

// Define the initial state using that type
const initialState = {} as BlockState

const blockSlice: any = createSlice({
  name: 'blockSpace',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: {},
})

export const {} = blockSlice.actions
export default blockSlice.reducer
