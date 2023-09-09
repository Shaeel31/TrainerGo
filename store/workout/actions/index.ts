import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchUsedWorkouts,
  newWorkout, workoutChange,
  workoutsSaveIt
} from '../../../reduxServices/workoutServices'
import {
  deleteBlock,
  editBlock,
  newBlock,
  blocksSaveIt,
  copyBlock,
  newBlockRest,
  useBlock
} from '../../../reduxServices/blockServices'
import {
  newExercise,
  editExercise,
  sortExercises,
  unGroupComboExercises,
  groupComboExercises,
  deleteExercise, copyExercise, newExerciseRest, newCustomExercise
} from '../../../reduxServices/exerciseServices'
import { _deleteExercise, _restBlock, _updateWorkout, onGroup, pushExercise, setActiveId } from '../index'
import { updateWorkoutId } from '../../users'

export const WORKSPACE_ACTION = {
  TRG_ADD__FETCH_CURRENT_WORKOUT: 'TRG_ADD__FETCH_CURRENT_WORKOUT',
  TRG_ADD_NEW_WORKOUT: 'TRG_ADD_NEW_WORKOUT',
  TRG_UPDATE_WORKOUT: 'TRG_UPDATE_WORKOUT',
  TRG_SAVE_WORKOUT: 'TRG_SAVE_WORKOUT',
  TRG_CLOSE_WORKOUT: 'TRG_CLOSE_WORKOUT',
  TRG_ADD_NEW_BLOCK: 'TRG_ADD_NEW_BLOCK',
  TRG_ADD_BLOCK: 'TRG_ADD_BLOCK',
  TRG_DELETE_BLOCK: 'TRG_DELETE_BLOCK',
  TRG_COPY_BLOCK: 'TRG_COPY_BLOCK',
  TRG_EDIT_BLOCK_META: 'TRG_EDIT_BLOCK_META',
  TRG_SAVE_BLOCK: 'TRG_SAVE_BLOCK',
  TRG_ADD_NEW_EXERCISE: 'TRG_ADD_NEW_EXERCISE',
  TRG_NEW_REST_EXERCISE: 'TRG_NEW_REST_EXERCISE',
  TRG_EDIT_EXERCISE: 'TRG_EDIT_EXERCISE',
  TRG_UN_GROUP_COMBO_EXERCISE: 'TRG_UN_GROUP_COMBO_EXERCISE',
  TRG_COMBO_EXERCISE: 'TRG_COMBO_EXERCISE',
  TRG_NEW_REST_BLOCK: 'TRG_NEW_REST_BLOCK',
  TRG_DELETE_EXERCISE: 'TRG_DELETE_EXERCISE',
  TRG_ADD_NEW_CUSTOM_EXERCISE: 'TRG_ADD_NEW_CUSTOM_EXERCISE',
  TRG_COPY_EXERCISE: 'TRG_COPY_EXERCISE',
  TRG_SORT_EXERCISE: 'TRG_SORT_EXERCISE'
}

export const fetchCurrentWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD__FETCH_CURRENT_WORKOUT,
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      return await fetchUsedWorkouts(id)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addNewWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_WORKOUT,
  async ({ title }: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await newWorkout(title)
      dispatch(setActiveId(response?.data?.id))
      dispatch(updateWorkoutId(response?.data?.id))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const updateWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_UPDATE_WORKOUT,
  async (workout: any, { rejectWithValue, dispatch }: any) => {
    try {
      console.log({ workout })
      dispatch(_updateWorkout(workout))
      dispatch(setActiveId(workout?.id))
      dispatch(updateWorkoutId(workout?.id))
      return await fetchUsedWorkouts(workout?.id)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_BLOCK,
  async ({ workoutId, blockId }: any, { rejectWithValue }: any) => {
    try {
      const response: any = await useBlock(workoutId, blockId)
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const closeWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_CLOSE_WORKOUT,
  async ({ title }: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await newWorkout(title)
      dispatch(setActiveId(response?.data?.id))
      dispatch(updateWorkoutId(response?.data?.id))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addNewBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_BLOCK,
  async ({ workoutId }: any, { rejectWithValue, dispatch }: any) => {
    const response: any = await newBlock(workoutId)
    // dispatch(setActiveId(response?.data?.id))
    // dispatch(updateWorkoutId(response?.data?.id))
    return response
  }
)
export const copy_Block: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_COPY_BLOCK,

  async ({ block, workoutId, blockId }: any, { rejectWithValue }: any) => {
    try {
      return await copyBlock(block, workoutId, blockId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
export const delBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_DELETE_BLOCK,
  async (
    { blockId, workoutId = '' }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await deleteBlock(blockId, workoutId)
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const editBlockMeta: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_EDIT_BLOCK_META,
  async (
    {
      title = null,
      formatId = null,
      rounds = null,
      blockId = null,
      workoutId = null
    }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await editBlock(title, formatId, rounds, blockId, workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
export const restBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_NEW_REST_BLOCK,
  async ({ workoutId, duration }: any, { rejectWithValue }: any) => {
    try {
      const response: any = await newBlockRest(workoutId, duration)
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
export const addNewExercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_EXERCISE,
  async ({ workoutId, blockId }: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await newExercise(workoutId, blockId, {
        mainTitle: 'Untitled',
        altTitle: 'Untitled'
      })
      dispatch(pushExercise({ blockId, data: response?.data }))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)


export const addNewCustomExercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_CUSTOM_EXERCISE,
  async ({ exerciseObj }: any, { rejectWithValue }: any) => {
    try {
      return await newCustomExercise(exerciseObj)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const newRestExercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_NEW_REST_EXERCISE,
  async ({ workoutId, blockId, duration }: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await newExerciseRest( blockId ,workoutId, duration)
      dispatch(_restBlock({ blockId, data: response?.data }))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)


export const delete_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_DELETE_EXERCISE,
  async (
    { exerciseId, workoutId, blockId }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await deleteExercise(exerciseId, workoutId)
      dispatch(_deleteExercise({ exerciseId, blockId }))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const copy_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_COPY_EXERCISE,
  async ({
           exercise, workoutId, blockId, exerciseId
         }: any, { rejectWithValue, dispatch }: any) => {
    try {
      console.log(exercise, workoutId, blockId, exerciseId)
      const response: any = await copyExercise(exercise, workoutId, blockId, exerciseId)
      dispatch(pushExercise({ blockId, data: response?.data }))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const sort_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_SORT_EXERCISE,
  async (
    { workoutId, blockId, oldIndex, newIndex }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await sortExercises(
        workoutId,
        blockId,
        oldIndex,
        newIndex
      )
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const combo_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_COMBO_EXERCISE,
  async (
    { block, exerciseIds, workoutId, blockId }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await groupComboExercises(
        block,
        exerciseIds,
        workoutId,
        blockId
      )
      dispatch(onGroup({ blockId, response }))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const unGroup_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_UN_GROUP_COMBO_EXERCISE,
  async (
    { block, comboParentId, comboExerciseIds, workoutId, blockId }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await unGroupComboExercises(
        block,
        comboParentId,
        comboExerciseIds,
        workoutId,
        blockId
      )
      dispatch(onGroup({ blockId, response }))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const saveWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_SAVE_WORKOUT,
  async ({ workout, workoutId, type }: any, { rejectWithValue }: any) => {
    try {
      return await workoutsSaveIt(workout, workoutId, type)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const saveBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_SAVE_BLOCK,
  async ({ block, workoutId, blockId, type }: any, { rejectWithValue }: any) => {
    try {
      return await blocksSaveIt(block, workoutId, blockId, type)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const edit_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_EDIT_EXERCISE,
  async (
    {
      exerciseId,
      workoutId,
      mainTitle,
      altTitle,
      mainInstructions,
      altInstructions,
      mainTechnicalYtLink,
      mainDemoYtLink,
      altTechnicalYtLink,
      altDemoYtLink,
      duration,
      reps,
      addTime,
      splitInterval,
      bodyWeightId,
      resistanceBandId,
      suspensionTrainerId,
      homeAppliencesId,
      blockId,
      type,
      saveFeature,
      image,
      altImage
    }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await editExercise(
        exerciseId,
        workoutId,
        mainTitle,
        altTitle,
        mainInstructions,
        altInstructions,
        mainTechnicalYtLink,
        mainDemoYtLink,
        altTechnicalYtLink,
        altDemoYtLink,
        duration,
        reps,
        addTime,
        splitInterval,
        bodyWeightId,
        resistanceBandId,
        suspensionTrainerId,
        homeAppliencesId,
        blockId,
        type,
        saveFeature,
        image,
        altImage
      )
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
