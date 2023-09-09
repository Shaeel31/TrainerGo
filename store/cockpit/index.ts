import { createSlice } from '@reduxjs/toolkit'
import { checkMessage } from '../lib/message'
import { getRegister } from './actions'
import { getSeconds, getTotalSeconds } from '../../libs/time'

// Define a type for the slice state
export interface CockpitState {
  id?: string
  totalTime?: any
  blocks?: any[]
  totalBlocks?: number
  totalExercises?: number
  block?: any
  exercises?: any
  exerciseTotalTime?: number
  exerciseTime?: any
  exerciseReps?: number

  consumedTime?: number
  currentBlockTime?: number
  totalWorkoutTimeWithRounds?: number

  _totalExercises?: number
  currentRoundTime?: number
  _total_rounds?: number
  _totalTime?: number
  _exerciseTime?: number
  _blockTime?: number
  _current_exercise?: any
  _next_exercise?: any
  _current_block?: any
  _next_block?: any
  _exercise_count?: number
  _block_count?: number
  _rounds_count?: number
  _exercise_end?: number
  _block_end?: number
  _rounds_end?: number
}

// Define the initial state using that type
const initialState = {
  totalTime: 0,
  blocks: [],
  totalBlocks: 0,
  totalExercises: 0,
  block: null,
  exercises: [],
  exerciseTotalTime: 0,
  exerciseTime: 0,
  exerciseReps: 0,

  currentRoundTime: 0,
  _totalExercises: 0,
  consumedTime: 0,
  totalTempTime: 0,
  currentBlockTime: 0,
  totalWorkoutTimeWithRounds: 0,
  _current_exercise: null,
  _current_block: null,
  _total_rounds: 0,
  _totalTime: 0,
  _exerciseTime: 0,
  _blockTime: 0,
  _next_exercise: null,
  _next_block: null,
  _exercise_count: 0,
  _block_count: 0,
  _rounds_count: 1,
  _exercise_end: 0,
  _block_end: 0,
  _rounds_end: 1,
} as CockpitState

const cockpitSlice: any = createSlice({
  name: 'cockpit',
  initialState,
  reducers: {
    updateTime: (state: CockpitState, action) => {
      if (state.consumedTime < state.totalTime) {
        state._totalTime -= action.payload
        state.consumedTime += action.payload
        state._exerciseTime -= state._exerciseTime && action.payload
      }
    },

    exerciseComplete: (state: CockpitState, action) => {
      state._exercise_count += 1
      state._exercise_end = action.payload
      if (state._exercise_count < state._totalExercises) {
        state._exerciseTime = getSeconds(
          state.exercises[state._exercise_count]?.duration
        )
        state.exerciseTime = getSeconds(
          state.exercises[state._exercise_count]?.duration
        )
        state._current_exercise = state.exercises[state._exercise_count]
        state._next_exercise = state.exercises[state._exercise_count + 1]
      }
    },

    resetBlock: (state: CockpitState, action) => {
      state._rounds_count += 1
      state._exercise_count = 0
      state.currentBlockTime = getSeconds(
        state._current_block?.exerciseTotalTime
      )
      state._current_exercise =
        state.blocks[state._block_count].exercises[state._exercise_count]
      state._next_exercise =
        state.blocks[state._block_count].exercises[state._exercise_count + 1]
      state._exerciseTime = getSeconds(
        state.blocks[state._block_count].exercises[state._exercise_count]
          ?.duration
      )
      state.exerciseTime = getSeconds(
        state.blocks[state._block_count].exercises[state._exercise_count]
          ?.duration
      )
      state._block_end = action.payload
    },

    blockComplete: (state: CockpitState, action) => {
      if (state._block_count < state.totalBlocks) {
        state._block_end = action.payload
        state._rounds_count = 1
        state._exercise_count = 0
        state._block_count += 1

        state._totalExercises =
          state?.blocks[state._block_count]?.exercises?.length
        state._total_rounds = state.blocks[state._block_count]?.rounds
        state._next_exercise =
          state.blocks[state._block_count]?.exercises[state._exercise_count + 1]
        state._current_exercise =
          state.blocks[state._block_count]?.exercises[state._exercise_count]
        state.exercises = state.blocks[state._block_count]?.exercises
        state._exerciseTime = getSeconds(
          state.blocks[state._block_count]?.exercises[state._exercise_count]
            ?.duration
        )
        state.exerciseTime = getSeconds(
          state.blocks[state._block_count]?.exercises[state._exercise_count]
            ?.duration
        )
        state.currentBlockTime = getSeconds(
          state.blocks[state._block_count]?.exerciseTotalTime
        )
        state.currentRoundTime =
          getSeconds(state.blocks[state._block_count]?.exerciseTotalTime) *
          state._rounds_count
      }
    },

    updateTotalTime: (state: CockpitState, action) => {
      state.totalTime = action.payload
    },
  },
  extraReducers: {
    [getRegister.fulfilled]: (state: CockpitState, { payload }) => {
      if (payload.status === 200) {
        const data = payload.data
        state.consumedTime = 0
        state.id = data?.id
        state.blocks = data?.blocks
        state.exercises = data?.blocks[state._block_count]?.exercises
        state._totalExercises =
          data?.blocks[state._block_count]?.exercises?.length
        state.totalBlocks = data?.totalBlocks
        state.totalExercises = data?.totalExercises
        state._current_block = data?.blocks[state._block_count]
        state._next_block =
          data?.blocks[
            state._block_count < state.totalBlocks
              ? state._block_count + 1
              : state._block_count
          ]
        state._current_exercise =
          data?.blocks[state._block_count]?.exercises[state._exercise_count]
        state._next_exercise =
          data?.blocks[state._block_count]?.exercises[
            state._exercise_count < state.totalExercises
              ? state._exercise_count + 1
              : state._exercise_count
          ]

        state.totalTime = getTotalSeconds(data?.totalWorkoutTimeWithRounds)
          ? getTotalSeconds(data?.totalWorkoutTimeWithRounds)
          : getTotalSeconds(data?.totalTime)
        state._totalTime = getTotalSeconds(data?.totalWorkoutTimeWithRounds)
          ? getTotalSeconds(data?.totalWorkoutTimeWithRounds)
          : getTotalSeconds(data?.totalTime)
        state.totalWorkoutTimeWithRounds = getTotalSeconds(
          data?.totalWorkoutTimeWithRounds
        )
        state.exerciseTime = getSeconds(state._current_exercise?.duration)
        state.currentBlockTime = getSeconds(
          state._current_block?.exerciseTotalTime
        )
        state._exerciseTime = getSeconds(state._current_exercise?.duration)
        state._blockTime = getSeconds(state._current_block?.exerciseTotalTime)
        state._total_rounds = state._current_block?.rounds
        state.currentRoundTime =
          getSeconds(state._current_block?.exerciseTotalTime) *
          state._current_block?.rounds
      }
    },
    [getRegister.pending]: (state) => {
      state.totalExercises = null
    },
    [getRegister.rejected]: (state, { payload }) => {
      state.totalExercises = null
      checkMessage(payload.status, payload.message)
    },
  },
})

export const {
  exerciseComplete,
  blockComplete,
  resetBlock,
  roundComplete,
  prev,
  nextExercise,
  reset,
  backward,
  forward,
  updateTime,
  updateTotalTime,
  setReps,
  setEx,
} = cockpitSlice.actions
export default cockpitSlice.reducer
