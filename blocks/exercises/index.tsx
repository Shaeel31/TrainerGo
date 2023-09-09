import * as React from 'react'
import { CSSProperties, FC, memo, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { ExerciseElement } from '../exercise-block'
import Button from '../../components/button'
import { ExerciseContainer } from './styled'
import { useDispatch } from 'react-redux'
import {
  combo_Exercise,
  sort_Exercise,
  unGroup_Exercise,
} from '../../store/workout/actions'
import { message } from 'antd'

const style: CSSProperties = {
  width: '100%',
}

// export interface ContainerState {
//   cardsById: { [key: string]: any }
//   cardsByIndex: any[]
// }

interface Exer {
  id?: any
  addInLibrary?: number
  addedInLibrary: number
  comboExercises?: any
  comboType: number
  created: number
  isDefault: number
  isUsed: number
  modified: number
  reps: number
  splitInterval: number
  addTime?: any
  altImage?: any
  image?: any
  status: number
  type: number
  duration: string
  accepts: string
  altTitle: string
  mainTitle: string
  searchText: string
  userId: string
  isLeft?: boolean
  altDemoYtLink: string
  altInstructions: string
  altTechnicalYtLink: string
  bodyWeightId: string
  homeAppliencesId: string
  mainDemoYtLink: string
  mainInstructions: string
  mainTechnicalYtLink: string
  resistanceBandId: string
  suspensionTrainerId: string
}

function buildCardData(exercises: Exer[]) {
  const cardsById: { [key: string]: any } = {}
  const cardsByIndex = []

  Object.values(exercises).forEach((item: Exer, idx) => {
    const {
      addInLibrary,
      addTime,
      addedInLibrary,
      altImage,
      image,
      isLeft,
      comboType,
      created,
      isDefault,
      isUsed,
      modified,
      reps,
      splitInterval,
      status,
      type,
      duration,
      accepts,
      altTitle,
      id,
      mainTitle,
      searchText,
      userId,
      altDemoYtLink,
      altInstructions,
      altTechnicalYtLink,
      bodyWeightId,
      homeAppliencesId,
      mainDemoYtLink,
      mainInstructions,
      mainTechnicalYtLink,
      resistanceBandId,
      comboExercises,
      suspensionTrainerId,
    } = item
    const card: Exer = {
      addInLibrary,
      addTime,
      addedInLibrary,
      comboType,
      altImage,
      image,
      created,
      isDefault,
      isUsed,
      modified,
      reps,
      splitInterval,
      status,
      isLeft,
      type,
      duration,
      accepts,
      altTitle,
      id,
      mainTitle,
      searchText,
      comboExercises,
      userId,
      altDemoYtLink,
      altInstructions,
      altTechnicalYtLink,
      bodyWeightId,
      homeAppliencesId,
      mainDemoYtLink,
      mainInstructions,
      mainTechnicalYtLink,
      resistanceBandId,
      suspensionTrainerId,
    }
    cardsById[card.id] = card
    cardsByIndex[idx] = card
  })

  return {
    cardsById,
    cardsByIndex,
  }
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface ContainerProps {
  exercises?: Exer[]
  workoutId?: any
  blockId?: any
  block?: any
}

const Exercises: FC<ContainerProps | any> = (props) => {
  const { exercises, workoutId, blockId, block } = props
  const [state, setState] = useState<any>(buildCardData(exercises))
  const [groupChecks, setGroupChecks] = useState<{ [key: string]: [] }>({})
  const dispatch = useDispatch()
  let pendingUpdateFn: any
  let requestedFrame: number | undefined

  function scheduleUpdate(updateFn: any) {
    pendingUpdateFn = updateFn

    if (!requestedFrame) {
      requestedFrame = requestAnimationFrame(drawFrame)
    }
  }

  const drawFrame = (): void => {
    const nextState = update(state, pendingUpdateFn)
    setState(nextState)

    pendingUpdateFn = undefined
    requestedFrame = undefined
  }

  const moveCard = (id: string, afterId: string): void => {
    const { cardsById, cardsByIndex }: any = state
    const card = cardsById[id]
    const afterCard = cardsById[afterId]

    const cardIndex = cardsByIndex.indexOf(card)
    const afterIndex = cardsByIndex.indexOf(afterCard)
    // We will send backend call to firestore for changing order
    dispatch(
      sort_Exercise({
        workoutId,
        blockId,
        oldIndex: cardIndex,
        newIndex: afterIndex,
      })
    )
    scheduleUpdate({
      cardsByIndex: {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card],
        ],
      },
    })
  }

  const handleGroup = (wid, bId) => {
    if (groupChecks[bId].length > 1) {
      dispatch(
        combo_Exercise({
          block,
          exerciseIds: groupChecks[bId],
          workoutId: wid,
          blockId: bId,
        })
      )
    } else {
      message.info('please select more than 1 exercise to group!')
    }
  }

  const onGroup = (ids, blockId) => {
    const { value, checked } = ids.target
    const _values = checked
      ? [...groupChecks[blockId], value]
      : groupChecks[blockId]?.filter((f) => f !== value)
    setGroupChecks({
      ...groupChecks,
      [blockId]: _values,
    })
  }

  const handleUnGroup = (
    comboParentId,
    comboExerciseIds,
    workoutId,
    blockId
  ) => {
    dispatch(
      unGroup_Exercise({
        block,
        comboParentId,
        comboExerciseIds,
        workoutId,
        blockId,
      })
    )
    setGroupChecks({ ...groupChecks, [blockId]: [] })
  }

  useEffect(() => {
    setState(buildCardData(props.exercises))
    setGroupChecks({ ...groupChecks, [blockId]: [] })
    return () =>
      requestedFrame !== undefined && cancelAnimationFrame(requestedFrame)
  }, [props.exercises])

  return (
    <ExerciseContainer style={style}>
      <Button
        type="primary"
        shape="round"
        icon={<img src="/icons/group-btn.svg" alt="combo" />}
        onClick={() => handleGroup(workoutId, blockId)}
      >
        Combo
      </Button>
      {state.cardsByIndex.map((card, idx) => {
        const check: any = groupChecks[blockId]
        return (
          <ExerciseElement
            key={idx}
            id={card?.id}
            handleChange={onGroup}
            checked={check?.includes(card?.id) ? true : false}
            workoutId={workoutId}
            blockId={blockId}
            exercise={card}
            handleUnGroup={handleUnGroup}
            moveCard={moveCard}
          />
        )
      })}
    </ExerciseContainer>
  )
}
export default memo(Exercises)
