import * as React from 'react'
import { Fragment, memo, useCallback, useState } from 'react'
import { DragContainer, OriginContainer } from './styled'
import update from 'immutability-helper'
import { useDispatch } from 'react-redux'
import { WorkSpace } from '../../features/drag-and-drop/workspace'
import { CurrentUser } from '../../store/users'
import { addExercise } from '../../store/workspace/actions'
import { BlockSpace } from '../../features/drag-and-drop/blocks'
import Block from '../../components/block'
import Exercises from '../exercises'
import { WorkOut } from '../../features/drag-and-drop/workouts'
import AddBlock from '../../components/addBlock'
import BlockRest from '../BlockRest'
import { addNewWorkout, updateWorkout, addBlock } from '../../store/workout/actions'

type Props = {
  boxes: any
  bins: any
  user?: CurrentUser
  workspace: any
  libraries: any
  isDropped?: any
  droppedBoxNames?: any
  setDroppedBoxNames?: any
}

export const ItemTypes = {
  WORKOUT: 'workout',
  BLOCK: 'block',
  EXERCISE: 'exercise'
}

const DragDrop = (props: Props) => {
  const {
    bins,
    workspace,
    // libraries,
    // isDropped,
    droppedBoxNames,
    setDroppedBoxNames
  } = props

  const dispatch = useDispatch()

  const [dustbins, setDustbins] = useState<DustbinState[]>(bins)

  const handleDropWorkout = useCallback(
    (index: any, { item }: any) => {
      dispatch(updateWorkout(item))
      setDroppedBoxNames(
        update(droppedBoxNames, item ? { $push: [item] } : { $push: [] })
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      )
    },
    [droppedBoxNames, dustbins]
  )

  const handleAddWorkout = useCallback(() => {
    dispatch(addNewWorkout({ title: 'untitle' }))
  }, [])

  const handleDropBlock = useCallback(
    (index: number, workoutId: any, { item }: any) => {
      dispatch(addBlock({ workoutId, blockId: item.id }))
      setDroppedBoxNames(
        update(droppedBoxNames, item ? { $push: [item] } : { $push: [] })
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      )
    },
    [droppedBoxNames, dustbins]
  )

  const handleDropExercise = useCallback(
    (index: number, workoutId: any, blockId: any, { item }: any) => {
      dispatch(addExercise({ exerciseData:item,workoutId, blockId, exerciseId: item?.id }))
      setDroppedBoxNames(
        update(droppedBoxNames, item ? { $push: [item] } : { $push: [] })
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      )
    },
    [droppedBoxNames, dustbins]
  )

  const origins = (
    <WorkSpace
      accepts='workout'
      lastDroppedItem={dustbins[0].lastDroppedItem}
      onDrop={(item) => handleDropWorkout(0, item)}
      current={workspace}
      onClick={handleAddWorkout}
    >
      {workspace && (
        <Fragment>
          <WorkOut
            accepts='block'
            lastDroppedItem={dustbins[1].lastDroppedItem}
            onDrop={(item) => handleDropBlock(1, workspace.id, item)}
            current={workspace.blocks}
          >
            {workspace?.blocks &&
            workspace?.blocks?.map((block: any, idx) => {
              if (block?.type === 2) {
                return (
                  <BlockRest
                    key={idx}
                    block={block}
                    workoutId={workspace?.id}
                  />
                )
              }
              return (
                <Block
                  key={`block-${idx}`}
                  index={idx + 1}
                  block={block}
                  workoutId={workspace?.id}
                  blockId={block?.id}
                >
                  <BlockSpace
                    key={`exerciseSpace-${idx}`}
                    accepts='exercise'
                    lastDroppedItem={dustbins[2].lastDroppedItem}
                    onDrop={(item) =>
                      handleDropExercise(2, workspace?.id, block?.id, item)
                    }
                    current={block?.exercises}
                  >
                    {block?.exercises && (
                      <Exercises
                        key={`exercise-${idx}`}
                        workoutId={workspace?.id}
                        blockId={block?.id}
                        exercises={block?.exercises}
                        block={block}
                      />
                    )}
                  </BlockSpace>
                </Block>
              )
            })}
          </WorkOut>
          <AddBlock current={workspace} />
        </Fragment>
      )}
    </WorkSpace>
  )

  return (
    <DragContainer>
      <OriginContainer>{origins}</OriginContainer>
    </DragContainer>
  )
}
export default memo(DragDrop)
