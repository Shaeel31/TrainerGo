import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  closeWorkout,
  deleteWorkout,
  editWorkout,
  fetchUsedWorkouts,
  newWorkout,
  workoutSettings,
  workoutsSaveIt
} from '../../../services/workoutServices'
import {
  blocksSaveIt,
  copyBlock,
  deleteBlock,
  newBlock,
  newBlockRest,
  useBlock
} from '../../../services/blockServices'
import {
  editBlock
} from '../../../reduxServices/blockServices'
import {
  copyExercise,
  deleteExercise,
  editExercise,
  fetchYoutubeData,
  groupComboExercises,
  newCustomExercise,
  newExercise,
  newExerciseRest,
  unGroupComboExercises,
  useExercise
} from '../../../reduxServices/exerciseServices'

export const WORKSPACE_ACTION = {
  TRG_ADD_NEW_WORKOUT: 'TRG_ADD_NEW_WORKOUT',
  TRG_UPDATE_WORKOUT: 'TRG_UPDATE_WORKOUT',
  TRG_DELETE_WORKOUT: 'TRG_DELETE_WORKOUT',
  TRG_WORKOUT_SETTINGS: 'TRG_WORKOUT_SETTINGS',
  TRG_ADD_NEW_BLOCK: 'TRG_ADD_NEW_BLOCK',
  TRG_SAVE_WORKOUT: 'TRG_SAVE_WORKOUT',
  TRG_CLOSE_WORKOUT: 'TRG_CLOSE_WORKOUT',
  TRG_EDIT_WORKOUT_TITLE: 'TRG_EDIT_WORKOUT_TITLE',
  TRG_FETCH_WORKOUT: 'TRG_FETCH_WORKOUT',
  TRG_ADD_BLOCK: 'TRG_ADD_BLOCK',
  TRG_DELETE_BLOCK: 'TRG_DELETE_BLOCK',
  TRG_SAVE_BLOCK: 'TRG_SAVE_BLOCK',
  TRG_COPY_BLOCK: 'TRG_COPY_BLOCK',
  TRG_NEW_REST_BLOCK: 'TRG_NEW_REST_BLOCK',
  TRG_ADD_EXERCISE: 'TRG_ADD_EXERCISE',
  TRG_COPY_EXERCISE: 'TRG_COPY_EXERCISE',
  TRG_DELETE_EXERCISE: 'TRG_DELETE_EXERCISE',
  TRG_COMBO_EXERCISE: 'TRG_COMBO_EXERCISE',
  TRG_UN_GROUP_COMBO_EXERCISE: 'TRG_UN_GROUP_COMBO_EXERCISE',
  TRG_REST_EXERCISE: 'TRG_REST_EXERCISE',
  TRG_NEW_REST_EXERCISE: 'TRG_NEW_REST_EXERCISE',
  TRG_EDIT_EXERCISE: 'TRG_EDIT_EXERCISE',
  TRG_ADD_NEW_EXERCISE: 'TRG_ADD_NEW_EXERCISE',
  TRG_ADD_NEW_CUSTOM_EXERCISE: 'TRG_ADD_NEW_CUSTOM_EXERCISE',
  TRG_EDIT_BLOCK_META: 'TRG_EDIT_BLOCK_META',
  TRG_FETCH_YOUTUBE_API: 'TRG_FETCH_YOUTUBE_API'
}
export const addNewWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_WORKOUT,
  async ({ title }: any, { rejectWithValue }: any) => {
    try {
      return await newWorkout(title)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const updateWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_UPDATE_WORKOUT,
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      return await fetchUsedWorkouts(id)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const delWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_DELETE_WORKOUT,
  async ({ workoutId }: any, { rejectWithValue }: any) => {
    try {
      return await deleteWorkout(workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const closeWork: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_CLOSE_WORKOUT,
  async ({ workoutId }: any, { rejectWithValue }: any) => {
    try {
      return await closeWorkout(workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const workout_Settings: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_WORKOUT_SETTINGS,
  async (
    {
      workoutId,
      volume,
      preparationTime,
      ticks,
      exerciseSoundId,
      exerciseColorId,
      restSoundId,
      restColorId,
      image
    }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await workoutSettings(
        workoutId,
        volume,
        preparationTime,
        ticks,
        restColorId,
        exerciseSoundId,
        exerciseColorId,
        restSoundId,
        image
      )
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const editWorkoutTitle: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_EDIT_WORKOUT_TITLE,
  async ({ workoutId, title }: any, { rejectWithValue }: any) => {
    try {
      return await editWorkout(workoutId, title)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const fetchWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_FETCH_WORKOUT,
  async ({ id }: any, { rejectWithValue }: any) => {
    try {
      return await fetchUsedWorkouts(id)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const saveWorkout: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_SAVE_WORKOUT,
  async ({ workoutId, type }: any, { rejectWithValue }: any) => {
    try {
      return await workoutsSaveIt(workoutId, type)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_BLOCK,
  async ({ workoutId, blockId }: any, { rejectWithValue }: any) => {
    try {
      return await useBlock(workoutId, blockId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addNewBlockService: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_BLOCK,
  async ({ workoutId }: any, { rejectWithValue }: any) => {
    try {
      return await newBlock(workoutId)
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

export const delBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_DELETE_BLOCK,
  async ({ blockId, workoutId = '' }: any, { rejectWithValue }: any) => {
    try {
      return await deleteBlock(blockId, workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const saveBlock: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_SAVE_BLOCK,
  async ({ workoutId, blockId, type }: any, { rejectWithValue }: any) => {
    try {
      return await blocksSaveIt(workoutId, blockId, type)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const copy_Block: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_COPY_BLOCK,
  async ({ workoutId, blockId }: any, { rejectWithValue }: any) => {
    try {
      return await copyBlock(workoutId, blockId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const rest_Block: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_NEW_REST_BLOCK,
  async ({ workoutId, duration }: any, { rejectWithValue }: any) => {
    try {
      return await newBlockRest(workoutId, duration)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addExercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_EXERCISE,
  async ({ exerciseData, workoutId, blockId, exerciseId }: any, { rejectWithValue }: any) => {
    try {
      const response: any = await useExercise(exerciseData, workoutId, blockId, exerciseId)
      return { data: response?.data, blockId }
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const copy_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_COPY_EXERCISE,
  async ({ exercise, workoutId, blockId, exerciseId }: any, { rejectWithValue }: any) => {
    try {
      return await copyExercise(exercise, workoutId, blockId, exerciseId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const delete_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_DELETE_EXERCISE,
  async ({ exerciseId, workoutId }: any, { rejectWithValue }: any) => {
    try {
      return await deleteExercise(exerciseId, workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const combo_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_COMBO_EXERCISE,
  async (
    { exerciseIds, workoutId, blockId }: any,
    { rejectWithValue }: any
  ) => {
    try {
      // console.log('service', { exerciseIds, workoutId, blockId })
      return await groupComboExercises(exerciseIds, workoutId, blockId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const unGroup_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_UN_GROUP_COMBO_EXERCISE,
  async (
    { block, comboParentId, comboExerciseIds, workoutId, blockId }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await unGroupComboExercises(
        block,
        comboParentId,
        comboExerciseIds,
        workoutId,
        blockId
      )
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const rest_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_REST_EXERCISE,
  async ({ exerciseIds, workoutId }: any, { rejectWithValue }: any) => {
    try {
      return await groupComboExercises(exerciseIds, workoutId)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const newRest_Exercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_NEW_REST_EXERCISE,
  async ({ workoutId, blockId, duration }: any, { rejectWithValue }: any) => {
    try {
      // console.log({ workoutId, blockId, duration })
      return await newExerciseRest(workoutId, blockId, duration)
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

export const addNewExercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_EXERCISE,
  async ({ workoutId, blockId }: any, { rejectWithValue }: any) => {
    try {
      return await newExercise(workoutId, blockId, {
        mainTitle: 'Untitled',
        altTitle: 'Untitled'
      })
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const addNewCustomExercise: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_ADD_NEW_CUSTOM_EXERCISE,
  async ( exerciseObj : any, { rejectWithValue }: any) => {
    try {
      return await newCustomExercise(exerciseObj)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const fetchYoutubeApi: any = createAsyncThunk(
  WORKSPACE_ACTION.TRG_FETCH_YOUTUBE_API,
  async (
    { searchText, maxResults = 25, specificChannel = false }: any,
    { rejectWithValue }: any
  ) => {
    try {
      return await fetchYoutubeData(searchText, maxResults, specificChannel)
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)
