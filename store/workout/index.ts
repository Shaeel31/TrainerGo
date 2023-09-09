import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import {
  addBlock,
  addNewBlock,
  addNewWorkout,
  combo_Exercise,
  copy_Block, copy_Exercise,
  delete_Exercise,
  editBlockMeta,
  fetchCurrentWorkout, newRestExercise, restBlock,
  saveBlock,
  saveWorkout,
  sort_Exercise,
  unGroup_Exercise, updateWorkout
} from '../workout/actions'
import { closeWorkout } from '../../services/workoutServices'
import _ from 'lodash'
import { getSeconds, getTime, getTotalTime } from '../../libs/time'
import moment from 'moment'
import { addExercise } from '../workspace/actions'

message.config({
  top: 400,
  duration: 1,
  maxCount: 3,
  rtl: false
})

// Define a type for the slice state
interface WorkoutState {
  currentWorkout?: CurrentWorkout | any
  activeId?: any
  currentExercise?: any
  isLoading?: boolean
}

// Define the initial state using that type
const initialState = {
  currentWorkout: null,
  activeId: null,
  currentExercise: null,
  isLoading: false
} as WorkoutState

const workoutSlice: any = createSlice({
  name: 'workoutSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    _updateWorkout: (state: WorkoutState, { payload }) => {
      state.currentWorkout = { ...payload, blocks: [] }
      state.activeId = payload?.id
    },
    editWorkout: (state: WorkoutState, { payload }) => {
      state.currentWorkout = { ...state.currentWorkout, ...payload }
    },
    workoutClose: (state: WorkoutState, { payload }) => {
      state.currentWorkout = null
      closeWorkout(payload.workoutId).catch((err) => console.log(err.message))
    },
    deleteBlock: (state: WorkoutState, { payload }) => {
      const { blockId } = payload
      if (blockId) {
        let currentBlock =  state.currentWorkout.blocks.find((f) => f.id === blockId)
        currentBlock = JSON.parse(JSON.stringify(currentBlock))
        state.currentWorkout = {
          ...state.currentWorkout,
          blocks: state.currentWorkout.blocks.filter((f) => f.id !== blockId)
        }

        let totalWorkoutTime =0;
        state.currentWorkout.blocks.forEach(element => {
          const currentBlockTime = element.type==1?element.exerciseTotalTime:element.duration
          const currentBlockTimeInSeconds = moment.duration(`00:${currentBlockTime}`).asSeconds()
          totalWorkoutTime +=currentBlockTimeInSeconds
        });
        state.currentWorkout.totalTime = moment.utc(totalWorkoutTime*1000).format('HH:mm:ss')

        state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
      }
    },

    editBlock: (state: WorkoutState, { payload }) => {
      const { blockId, data } = payload
      const found = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o?.id == blockId
      })

      state.currentWorkout.blocks[found] = {
        ...state.currentWorkout.blocks[found],
        ...data
      }

      state.currentWorkout.blocks[found]!.duration += moment.duration(`00:${data.duration}`).asSeconds()
      state.currentWorkout.blocks[found]!.exerciseTotalTime = moment
        .utc(
          state.currentWorkout.blocks[found]!.duration *
            (1000 * state.currentWorkout.blocks[found]!.rounds || 1)
        )
        .format('mm:ss')


      let totalTime = 0;
      state.currentWorkout.blocks.map((block)=>{
        
        block = JSON.parse(JSON.stringify(block))
        if(block.type==1){
          totalTime += moment.duration(`00:${block?.exerciseTotalTime}`).asSeconds()
        }else if(block.type==2){
          totalTime += moment.duration(`00:${block?.duration}`).asSeconds()
        }
       
      })
            state.currentWorkout.totalTime = moment.utc(totalTime*1000).format('HH:mm:ss')
    },
    _restBlock: (state: WorkoutState, { payload }) => {
      const { blockId, data } = payload
      const found = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o?.id === blockId
      })
      console.log({ blockId, data, found })
      if (blockId) {
        state.currentWorkout.blocks[found].exercises.push(data)
        state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
        if (!state.currentWorkout.blocks[found]!.exerciseTotalTime) {
          state.currentWorkout.blocks[found]!.exerciseTotalTime = 0
        }
        state.currentWorkout.blocks[found]!.duration += moment.duration(`00:${data.duration}`).asSeconds()
        state.currentWorkout.blocks[found]!.exerciseTotalTime = moment.utc(state.currentWorkout.blocks[found]!.duration * 1000).format('mm:ss')
        let totalTime = moment.duration(state.currentWorkout.totalTime).asSeconds() + moment.duration(`00:${data.duration}`).asSeconds();
        state.currentWorkout.totalTime = moment.utc(totalTime*1000).format('HH:mm:ss')
      }
    },
    clearOnLogout: (state: WorkoutState) => {
      state.currentWorkout = null
    },
    pushExercise: (state: WorkoutState, { payload }) => {
      const { blockId, data } = payload
      const found = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o.id == blockId
      })
      if (payload?.data !== null) {
        if (!state.currentWorkout.blocks[found]!.exerciseTotalTime) {
          state.currentWorkout.blocks[found]!.exerciseTotalTime = 0
        }
        state.currentWorkout.blocks[found]?.exercises?.push(data)
        state.currentWorkout.blocks[found]!.duration += moment.duration(`00:${data.duration}`).asSeconds()
        state.currentWorkout.blocks[found]!.exerciseTotalTime = moment.utc(state.currentWorkout.blocks[found]!.duration * 1000).format('mm:ss')
        state.currentWorkout.totalExercises = _.reduce(
          state.currentWorkout?.blocks,
          function(sum, n) {
            n = JSON.parse(JSON.stringify(n))
            if(n?.type==1){
              let exercises = n?.exercises?.filter(element=>element.type===1)
              return sum + exercises.length
            }else{
              return sum
            }
          },
          0
        )

        let currentWorkoutTotalTime = moment.duration(state.currentWorkout.totalTime).asSeconds()

        let totalWorkoutTime =  currentWorkoutTotalTime + moment.duration(`00:${data.duration}`).asSeconds()
        state.currentWorkout.totalTime = getTotalTime(totalWorkoutTime*1000)
      }
    },
    _deleteExercise: (state: WorkoutState, { payload }) => {
      const { blockId, exerciseId } = payload

      const found = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o.id == blockId
      })

      let exercises = JSON.parse(JSON.stringify(state.currentWorkout.blocks[found]?.exercises))
      let exercise = exercises.find(element => {
        return (element?.id == exerciseId)
      })

      state.currentWorkout.blocks[found].exercises =
        state.currentWorkout.blocks[found]?.exercises?.filter(
          (f) => f?.id !== exerciseId
        )

      state.currentWorkout.blocks[found]!.duration -= moment.duration(`00:${exercise.duration}`).asSeconds()
      state.currentWorkout.blocks[found]!.exerciseTotalTime = moment.utc(state.currentWorkout.blocks[found]!.duration * 1000).format('mm:ss')

      let totalWorkoutTime =0;
      state.currentWorkout.blocks.forEach(element => {
        const currentBlockTime = element.type==1?element.exerciseTotalTime:element.duration
        const currentBlockTimeInSeconds = moment.duration(`00:${currentBlockTime}`).asSeconds()
        totalWorkoutTime +=currentBlockTimeInSeconds
      });
      state.currentWorkout.totalTime = moment.utc(totalWorkoutTime*1000).format('HH:mm:ss')

    },
    exerciseEdit: (state: WorkoutState, { payload }) => {
      const { blockId, data } = payload

      const blockIndex = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o.id == blockId
      })

      const exerciseIndex = _.findIndex(
        state.currentWorkout.blocks[blockIndex]?.exercises,
        function(o) {
          return o.id == data?.id
        }
      )
      if (payload?.data !== null) {
        state.currentWorkout.blocks[blockIndex].exercises[exerciseIndex] = data
      
        let exercises = state?.currentWorkout?.blocks[blockIndex]?.exercises;
        let updatedBlockDuration = 0;
        if(exercises && exercises.length){
          exercises.forEach((exer)=>{
            exer = JSON.parse(JSON.stringify(exer));
            let duration = moment.duration(`00:${exer.duration}`).asSeconds();
            updatedBlockDuration += duration;
          })
        }
        if(updatedBlockDuration){
          state.currentWorkout.blocks[blockIndex].duration = updatedBlockDuration;
          state.currentWorkout.blocks[blockIndex].exerciseTotalTime = moment.utc(1000 * updatedBlockDuration).format('mm:ss')
        }

        state.currentWorkout.totalTime = getTotalTime(
          _.reduce(
            state.currentWorkout?.blocks,
            function(sum, n) {
              return (
                sum +
                _.reduce(
                  n?.exercises,
                  function(prev, next) {
                    return prev + getSeconds(next?.duration)
                  },
                  0
                )
              )
            },
            0
          )
        )
      }
    },
    setActiveId: (state: WorkoutState, { payload }) => {
      if (payload === null) {
        state.activeId = null
        state.currentWorkout = null
      }
      state.activeId = payload
    },
    onGroup: (state: WorkoutState, { payload }) => {
      const { blockId, response } = payload
      const blockIndex = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o.id == blockId
      })

      if (!_.isEmpty(response?.data)) {
        state.currentWorkout.blocks[blockIndex] = response?.data
      }
      // state.activeId = payload
    },
    getCurrentExercise: (state, { payload }) => {
      state.currentExercise = payload
    },
    onCurrentExerciseChange: (state, { payload }) => {
      state.currentExercise = { ...state.currentExercise, ...payload }
    }
  },

  extraReducers: {
    [fetchCurrentWorkout.fulfilled]: (state: WorkoutState, { payload }) => {
      console.log('fetchCurrentWorkout', payload.data)
      state.currentWorkout = payload?.data
      state.activeId = payload?.data?.id
      state.isLoading = false
    },
    [fetchCurrentWorkout.pending]: (state: WorkoutState) => {
      state.currentWorkout = null
      state.isLoading = true
    },
    [fetchCurrentWorkout.rejected]: (state: WorkoutState) => {
      state.currentWorkout = null
      state.isLoading = false
    },

    [saveWorkout.fulfilled]: (state: WorkoutState, { payload }) => {
      console.log({ payload })
      state.currentWorkout = payload?.data
      state.isLoading = false
    },
    [saveWorkout.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [saveWorkout.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [updateWorkout.fulfilled]: (state: WorkoutState, { payload }) => {
      state.currentWorkout = payload?.data
      state.isLoading = false
    },
    [updateWorkout.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [updateWorkout.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [addNewWorkout.fulfilled]: (state: WorkoutState, { payload }) => {
      state.currentWorkout = payload?.data
      state.activeId = payload?.data?.id
      state.isLoading = false
    },
    [addNewWorkout.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [addNewWorkout.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [addNewBlock.fulfilled]: (state: WorkoutState, { payload }) => {
      if (payload?.data) {
        state.currentWorkout.blocks?.push(payload?.data)
        state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
        let totalWorkoutTime =0;
        state.currentWorkout.blocks.forEach(element => {
          const currentBlockTime = element.type==1?element.exerciseTotalTime:element.duration
          const currentBlockTimeInSeconds = moment.duration(`00:${currentBlockTime}`).asSeconds()
          totalWorkoutTime +=currentBlockTimeInSeconds
        });
        state.currentWorkout.totalTime = moment.utc(totalWorkoutTime*1000).format('HH:mm:ss')

      }
      state.isLoading = false
    },
    [addNewBlock.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [addNewBlock.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [addBlock.fulfilled]: (state: WorkoutState, { payload }) => {
      const { data } = payload
      state.currentWorkout.blocks?.push(data)
      state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
      state.currentWorkout.totalTime = getTotalTime(
        _.reduce(
          state.currentWorkout?.blocks,
          function(sum, n) {
            return (
              sum +
              _.reduce(
                n?.exercises,
                function(prev, next) {
                  return prev + getSeconds(next?.duration)
                },
                0
              )
            )
          },
          0
        )
      )
      state.isLoading = false
    },
    [addBlock.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [addBlock.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },


    [saveBlock.fulfilled]: (state: WorkoutState, { payload }) => {
      if (payload?.data) {
        const blockIndex = _.findIndex(state.currentWorkout.blocks, function(o) {
          return o.id == payload?.data?.id
        })

        state.currentWorkout.blocks[blockIndex] = payload?.data
      }
      state.isLoading = false
    },
    [saveBlock.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [saveBlock.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [restBlock.fulfilled]: (state: WorkoutState, { payload }) => {
      if (payload?.data) {
        let totalTime = moment.duration(state.currentWorkout.totalTime).asSeconds() + moment.duration(`00:${payload?.data.duration}`).asSeconds();
        state.currentWorkout.totalTime = moment.utc(totalTime*1000).format('HH:mm:ss')
        state.currentWorkout.blocks?.push(payload?.data)
        state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
      }
      state.isLoading = false
    },
    [restBlock.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [restBlock.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [newRestExercise.fulfilled]: (state: WorkoutState, { payload }) => {
      if (payload?.data) {
        // state.currentWorkout.blocks?.push(payload?.data)
        // state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
      }
      state.isLoading = false
    },
    [newRestExercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [newRestExercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [copy_Block.fulfilled]: (state: WorkoutState, { payload }) => {
      if (payload?.data) {
        state.currentWorkout.blocks?.push(payload?.data)
        state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
      }
      state.isLoading = false
    },
    [copy_Block.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [copy_Block.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [editBlockMeta.fulfilled]: (state: WorkoutState, { payload }) => {
      state.isLoading = false
    },
    [editBlockMeta.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [editBlockMeta.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [unGroup_Exercise.fulfilled]: (state: WorkoutState, { payload }) => {
      console.log('unGroup_Exercise => ', payload)
      state.isLoading = false
    },
    [unGroup_Exercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [unGroup_Exercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [combo_Exercise.fulfilled]: (state: WorkoutState, { payload }) => {
      console.log('combo_Exercise => ', payload)
      state.isLoading = false
    },
    [combo_Exercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [combo_Exercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [copy_Exercise.fulfilled]: (state: WorkoutState, { payload }) => {
      state.isLoading = false
    },
    [copy_Exercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [copy_Exercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [addExercise.fulfilled]: (state: WorkoutState, { payload }) => {
      const { data, blockId } = payload
      const blockIndex = _.findIndex(state.currentWorkout.blocks, function(o) {
        return o.id == blockId
      })
      state.currentWorkout.blocks[blockIndex].exercises?.push(data)
      state.currentWorkout.totalBlocks = state.currentWorkout.blocks?.length
      state.currentWorkout.totalTime = getTotalTime(
        _.reduce(
          state.currentWorkout?.blocks,
          function(sum, n) {
            return (
              sum +
              _.reduce(
                n?.exercises,
                function(prev, next) {
                  return prev + getSeconds(next?.duration)
                },
                0
              )
            )
          },
          0
        )
      )
      state.isLoading = false
    },
    [addExercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [addExercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [delete_Exercise.fulfilled]: (state: WorkoutState, { payload }) => {
      console.log('delete_Exercise => ', payload)
      state.currentWorkout.totalExercises = _.reduce(
        state.currentWorkout?.blocks,
        function(sum, n) {
          n = JSON.parse(JSON.stringify(n))
          if(n?.type==1){
            let exercises = n?.exercises?.filter(element=>element.type===1)
            return sum + exercises.length
          }else{
            return sum
          }
        },
        0
      )
      state.isLoading = false
    },
    [delete_Exercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [delete_Exercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    },

    [sort_Exercise.fulfilled]: (state: WorkoutState, { payload }) => {
      console.log('sort_Exercise => ', payload)
      if (payload.data) {
        state?.currentWorkout?.blocks.forEach((data, index) => {
          if (data?.id === payload?.data?.blockId) {
            let exercises = data?.exercises
            exercises = exercises.sort(function (a, b) {
              return (
                payload?.exercises?.indexOf(a?.id) -
                payload?.exercises?.indexOf(b?.id)
              )
            })

            data.exercises = exercises
          }
        })
      }
      state.isLoading = false
    },
    [sort_Exercise.pending]: (state: WorkoutState) => {
      state.isLoading = true
    },
    [sort_Exercise.rejected]: (state: WorkoutState) => {
      state.isLoading = false
    }
  }
})

export const {
  editWorkout,
  workoutClose,
  onGroup,
  clearOnLogout,
  deleteBlock,
  editBlock,
  pushExercise,
  setActiveId,
  _deleteExercise,
  _restBlock,
  _updateWorkout,
  exerciseEdit,
  getCurrentExercise, onCurrentExerciseChange
} = workoutSlice.actions
export default workoutSlice.reducer
