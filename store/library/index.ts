import { createSlice } from '@reduxjs/toolkit'
import {
  filterExercises,
  getBlocks,
  getExercises,
  getWorkouts,
  searchBlock,
  searchExercise,
  searchWorkout,
} from './actions'
import { checkMessage } from '../lib/message'

// Object.values(trenergo_workouts.workouts).forEach((i) => {
//   workouts.push({
//     id: i.id,
//     title: i.title,
//     accepts: 'workout',
//     FK: i.FK,
//     ref: i.ref
//   })

//   Object.values(i.blocks).forEach((b) => {
//     blocks.push({
//       id: b.id,
//       title: b.title,
//       accepts: 'block',
//       FK: b.FK,
//       ref: b.ref
//     })
//     i.blocks &&
//     b.exercises &&
//     Object.values(b.exercises).forEach((e) => {
//       exercises.push({
//         id: e.id,
//         title: e.title,
//         accepts: 'exercise',
//         FK: e.FK,
//         ref: e.ref
//       })
//     })
//   })
// })

// Define a type for the slice state
interface LibraryState {
  workout: Workout
  workouts: Workspace
  getWorkouts: any
  getBlocks: any
  getExercises: any
}

// Define the initial state using that type
const initialState = {
  workouts: null,
  workout: null,
  getWorkouts: null,
  getBlocks: null,
  getExercises: null,
} as LibraryState

const librarySlice: any = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // getWorkouts: (state) => {
    //   state.getWorkouts = workouts
    // },
    // getBlocks: (state) => {
    //   state.getBlocks = blocks
    // },
    // getExercises: (state) => {
    //   state.getExercises = exercises
    // },
    // workouts: (state, action: PayloadAction<any>) => {
    //   state.workouts = action.payload
    // },
    // workout: (state, action: PayloadAction<Workout>) => {
    //   state.workout = action.payload
    // }
  },
  extraReducers: {
    // Workouts for library actions
    [getWorkouts.fulfilled]: (state, { payload }) => {
      state.getWorkouts = payload.data
    },
    [getWorkouts.pending]: (state) => {
      state.getWorkouts = null
    },
    [getWorkouts.rejected]: (state, { payload }) => {
      state.getWorkouts = null
      checkMessage(payload.status, payload.message)
    },

    [searchWorkout.fulfilled]: (state, { payload }) => {
      state.getWorkouts = payload.data
    },
    [searchWorkout.pending]: (state) => {
      state.getWorkouts = null
    },
    [searchWorkout.rejected]: (state, { payload }) => {
      state.getWorkouts = null
      checkMessage(payload.status, payload.message)
    },
    // blocks for library actions
    [getBlocks.fulfilled]: (state, { payload }) => {
      state.getBlocks = payload.data
    },
    [getBlocks.pending]: (state) => {
      state.getBlocks = null
    },
    [getBlocks.rejected]: (state, { payload }) => {
      state.getBlocks = null
      checkMessage(payload.status, payload.message)
    },
    // blocks for library actions
    [searchBlock.fulfilled]: (state, { payload }) => {
      state.getBlocks = payload.data
    },
    [searchBlock.pending]: (state) => {
      state.getBlocks = null
    },
    [searchBlock.rejected]: (state, { payload }) => {
      state.getBlocks = null
      checkMessage(payload.status, payload.message)
    },
    // exercises for library actions
    [getExercises.fulfilled]: (state, { payload }) => {
      state.getExercises = payload.data
    },
    [getExercises.pending]: (state) => {
      state.getExercises = null
    },
    [getExercises.rejected]: (state, { payload }) => {
      state.getExercises = null
      checkMessage(payload.status, payload.message)
    },
    // exercises for library actions
    [searchExercise.fulfilled]: (state, { payload }) => {
      state.getExercises = payload.data
    },
    [searchExercise.pending]: (state) => {
      state.getExercises = null
    },
    [searchExercise.rejected]: (state, { payload }) => {
      state.getExercises = null
      checkMessage(payload.status, payload.message)
    },
    // exercises for library actions
    [filterExercises.fulfilled]: (state, { payload }) => {
      state.getExercises = payload.data
    },
    [filterExercises.pending]: (state) => {
      state.getExercises = null
    },
    [filterExercises.rejected]: (state, { payload }) => {
      state.getExercises = null
      checkMessage(payload.status, payload.message)
    },
  },
})

export const { workout } = librarySlice.actions

export default librarySlice.reducer
