import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWorkout } from '../../../services/cockpitServices'

const ACTION = {
  COCKPIT_GET_EXERCISES: 'COCKPIT_GET_EXERCISES',
}

export const getRegister: any = createAsyncThunk(
  ACTION.COCKPIT_GET_EXERCISES,
  async ({ workoutId }: any, { rejectWithValue }: any) => {
    try {
      return await fetchWorkout(workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
