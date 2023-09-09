import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../reducers'

// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState = {
  value: 0,
} as CounterState

const counterSlice: any = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount: any = (state: RootState) => state.counter.value

export default counterSlice.reducer
