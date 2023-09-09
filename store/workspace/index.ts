import { createSlice } from '@reduxjs/toolkit'
import { checkMessage } from '../lib/message'
import {
  addBlock,
  addExercise,
  addNewWorkout,
  delBlock,
  delWorkout,
  editBlockMeta,
  editWorkoutTitle,
  fetchWorkout,
  updateWorkout,
  closeWork,
  saveWorkout,
  addNewExercise,
  saveBlock,
  copy_Block,
  copy_Exercise,
  workout_Settings,
  edit_Exercise,
  combo_Exercise,
  unGroup_Exercise,
  newRest_Exercise,
  rest_Block,
  fetchYoutubeApi,
} from './actions'
import { message } from 'antd'

message.config({
  top: 400,
  duration: 1,
  maxCount: 3,
  rtl: false,
})

// Define a type for the slice state
interface WorkSpaceState {
  workout?: CurrentWorkout
  activeWorkout?: any
  groupsIds?: any
  loading?: boolean
  youtubeData?: any
  currentExercise?: any
}

// Define the initial state using that type
const initialState = {
  activeWorkout: null,
  workout: null,
  groupsIds: {},
  loading: false,
  youtubeData: null,
  currentExercise: null,
} as WorkSpaceState

const workSpaceSlice: any = createSlice({
  name: 'workspace',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    flushIds: (state) => {
      state.groupsIds = null
    },
    makeGroup: (state, { payload }: any) => {
      state.groupsIds[payload] = payload
    },
    makeUnGroup: (state, { payload }) => {
      delete state.groupsIds[payload]
    },
    getCurrentExercise: (state, { payload }) => {
      state.currentExercise = payload
    },
    onCurrentExerciseChange: (state, { payload }) => {
      console.log({ payload })
      state.currentExercise = { ...state.currentExercise, ...payload }
    },
  },
  extraReducers: {
    [addNewWorkout.fulfilled]: (state, { payload }) => {
      state.activeWorkout = payload.data
    },
    [addNewWorkout.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [fetchWorkout.fulfilled]: (state) => {
      state.groupsIds = {}
      state.loading = false
    },
    [fetchWorkout.pending]: (state, { payload }) => {
      state.loading = true
    },
    [fetchWorkout.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
      state.loading = false
    },
    [updateWorkout.fulfilled]: (state, { payload }) => {
      if (payload?.status === 200) {
        state.activeWorkout = payload.data
        state.loading = false
        state.groupsIds = {}
      }
    },
    [updateWorkout.pending]: (state, { payload }) => {
      state.loading = true
      checkMessage(payload?.status, payload?.message)
    },
    [updateWorkout.rejected]: (state, { payload }) => {
      state.loading = false
      checkMessage(payload?.status, payload?.message)
    },
    [workout_Settings.fulfilled]: () => {},
    [workout_Settings.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [addBlock.fulfilled]: (state, { payload }) => {
      if (payload?.status === 200) {
        state.groupsIds = {}
      }
    },
    [addBlock.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [addExercise.fulfilled]: () => {},
    [addExercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [editWorkoutTitle.fulfilled]: (state: any, { payload }) => {
      // if (payload?.status === 200) {
      //   state.activeWorkout['title'] = payload.title
      // }
    },
    [editWorkoutTitle.rejected]: (state, { payload }) => {
      // checkMessage(payload?.status, payload?.message)
    },

    [editBlockMeta.fulfilled]: () => {},
    [editBlockMeta.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [delBlock.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [delBlock.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [saveBlock.fulfilled]: (state, { payload }) => {
      state.loading = false
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [saveBlock.pending]: (state, { payload }) => {
      state.loading = true
    },
    [saveBlock.rejected]: (state, { payload }) => {
      state.loading = false
      checkMessage(payload?.status, payload?.message)
    },

    [copy_Block.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [copy_Block.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [rest_Block.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [rest_Block.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [delWorkout.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [delWorkout.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [closeWork.fulfilled]: (state, { payload }) => {
      if (payload?.status === 200) {
        state.activeWorkout = null
        state.groupsIds = {}
      }
    },
    [closeWork.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [saveWorkout.fulfilled]: (state, { payload }) => {
      state.loading = false
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [saveWorkout.pending]: (state, { payload }) => {
      state.loading = true
    },
    [saveWorkout.rejected]: (state, { payload }) => {
      state.loading = false
      checkMessage(payload?.status, payload?.message)
    },

    [addNewExercise.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [addNewExercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [copy_Exercise.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [copy_Exercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [edit_Exercise.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },

    [edit_Exercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [combo_Exercise.fulfilled]: (state, { payload }) => {
      console.log('grouped', payload)
      if (payload?.status === 200) {
        state.groupsIds = {}
      }
    },
    [combo_Exercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [unGroup_Exercise.fulfilled]: (state, { payload }) => {
      console.log('ungrouped', payload)
      if (payload?.status === 200) {
        state.groupsIds = {}
      }
    },
    [unGroup_Exercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [newRest_Exercise.fulfilled]: (state, { payload }) => {
      if (payload?.status === 400) {
        checkMessage(payload?.status, payload?.message)
      }
    },
    [newRest_Exercise.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },

    [fetchYoutubeApi.fulfilled]: (state, { payload }) => {
      if (payload?.status === 200) {
        state.youtubeData = payload?.data?.map((i) => ({
          ...i,
          mainTechnicalYtLink: i?.videoLink,
          altTechnicalYtLink: i?.videoLink,
          image: i?.videoThumbnails?.high?.url,
        }))
      }
    },
    [fetchYoutubeApi.rejected]: (state, { payload }) => {
      checkMessage(payload?.status, payload?.message)
    },
  },
})

export const { getCurrentExercise, flushIds, onCurrentExerciseChange } =
  workSpaceSlice.actions
export default workSpaceSlice.reducer
