import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWorkouts } from '../../../services/workoutServices'
import { fetchBlocks } from '../../../services/blockServices'
import {
  fetchExercises,
  filterExercise,
} from '../../../services/exerciseServices'

const ACTION = {
  GET_WORKOUTS: 'GET_WORKOUTS',
  SEARCH_WORKOUTS: 'SEARCH_WORKOUTS',
  GET_BLOCKS: 'GET_BLOCKS',
  SEARCH_BLOCKS: 'SEARCH_BLOCKS',
  GET_EXERCISES: 'GET_EXERCISES',
  SEARCH_EXERCISES: 'SEARCH_EXERCISES',
  FILTER_EXERCISES: 'FILTER_EXERCISES',
}

export const getWorkouts: any = createAsyncThunk(
  ACTION.GET_WORKOUTS,
  async ({ limit, searchText }: any, { rejectWithValue }: any) => {
    try {
      return await fetchWorkouts(limit, searchText)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const getBlocks: any = createAsyncThunk(
  ACTION.GET_BLOCKS,
  async ({ limit, searchText, isUsed = 0 }: any, { rejectWithValue }: any) => {
    try {
      return await fetchBlocks(limit, searchText, isUsed)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const getExercises: any = createAsyncThunk(
  ACTION.GET_EXERCISES,
  async ({ limit, searchText, isUsed = 0 }: any, { rejectWithValue }: any) => {
    try {
      return await fetchExercises(limit, searchText, isUsed)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const searchWorkout: any = createAsyncThunk(
  ACTION.SEARCH_WORKOUTS,
  async ({ limit, searchText = '', sort }: any, { rejectWithValue }: any) => {
    try {
      return await fetchWorkouts(limit, searchText, sort)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
export const searchBlock: any = createAsyncThunk(
  ACTION.SEARCH_BLOCKS,
  async (
    { limit, searchText = '', isUsed = 0, sort }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await fetchBlocks(limit, searchText, isUsed, sort)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
export const searchExercise: any = createAsyncThunk(
  ACTION.SEARCH_EXERCISES,
  async (
    { limit, searchText = '', isUsed = 0, sort }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await fetchExercises(limit, searchText, isUsed, sort)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const filterExercises: any = createAsyncThunk(
  ACTION.FILTER_EXERCISES,
  async (
    {
      limit,
      suspensionTrainerId,
      resistanceBandId,
      homeAppliencesId,
      bodyWeightId,
    }: any,
    { rejectWithValue }: any
  ) => {
    try {
      console.log({
        limit,
        suspensionTrainerId,
        resistanceBandId,
        homeAppliencesId,
        bodyWeightId,
      })
      return await filterExercise(
        limit,
        suspensionTrainerId,
        resistanceBandId,
        homeAppliencesId,
        bodyWeightId
      )
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
