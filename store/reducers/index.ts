import { combineReducers } from '@reduxjs/toolkit'
import userSlice from '../users'
import LibraryState from '../library'
import workspaceSlice from '../workspace'
import exerciseSlice from '../exercise'
import blockSlice from '../blocks'
import workoutSlice from '../workout'
import cockpitSlice from '../cockpit'

export const rootReducer = combineReducers({
  users: userSlice,
  workspace: workspaceSlice,
  workout: workoutSlice,
  blocks: blockSlice,
  exercises: exerciseSlice,
  library: LibraryState,
  cockpit: cockpitSlice,
})
export type RootState = ReturnType<typeof rootReducer | any>
