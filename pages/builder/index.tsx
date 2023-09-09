import * as React from 'react'
import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from '../../layout/dashboard'
import { RootState } from '../../store/reducers'
import DragDrop, { ItemTypes } from '../../blocks/dragDrop'
import { trenergo_workouts } from '../../model/workout'
import { userLogout } from '../../store/users/actions'
import { fetchYoutubeApi } from '../../store/workspace/actions'
import Library from '../../blocks/libraries'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Loading from '../../blocks/loading'
import { fetchCurrentWorkout } from '../../store/workout/actions'
import { clearOnLogout } from '../../store/workout'
import { isEmpty } from 'lodash'
import { isUserAuthenticated } from '../../reduxServices/authServices'
import {
  getBlocks,
  getExercises,
  getWorkouts,
} from '../../store/library/actions'
import { checkMessage } from '../../store/lib/message'
import { db } from '../../firebase/index'
// const data = require('../../model/map.json')
const AdminPage: any = () => {
  const [droppedBoxNames, setDroppedBoxNames] = useState<any>([])

  function isDropped(boxName: any) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const {
    users: { isAuthenticated, currentUser },
    library,
    workout: { currentWorkout, activeId },
  } = useSelector((state: RootState) => state)

  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(userLogout())
    dispatch(clearOnLogout())
  }

  const bins: any = [
    { accepts: [ItemTypes.WORKOUT], lastDroppedItem: null },
    { accepts: [ItemTypes.BLOCK], lastDroppedItem: null },
    { accepts: [ItemTypes.EXERCISE], lastDroppedItem: null },
  ]

  const [boxes] = useState<Workspace>(trenergo_workouts)

  useEffect(() => {
    !isEmpty(activeId)
    //============================changed code====================================
    !isEmpty(activeId) &&
      isEmpty(currentWorkout) &&
      dispatch(fetchCurrentWorkout({ id: activeId }))
    //======================================================================

    isUserAuthenticated().then((uid: any) => {
      uid &&
        db
          .collection('workouts')
          .where('userId', '==', uid)
          .where('addInLibrary', '==', 1)
          .onSnapshot(
            (snap) => {
              snap.size > 0 && dispatch(getWorkouts({ limit: 10 }))
            },
            (err) => {
              checkMessage(400, err.message)
            }
          )
    })

    isUserAuthenticated().then((uid: any) => {
      uid &&
        db
          .collection('blocks')
          .where('userId', '==', uid)
          .where('addInLibrary', '==', 1)
          .onSnapshot(
            (snap) => {
              snap.size > 0 && dispatch(getBlocks({ limit: 10 }))
            },
            (err) => {
              checkMessage(400, err.message)
            }
          )
    })

    isUserAuthenticated().then((uid: any) => {
      uid &&
        db
          .collection('exercises')
          .where('userId', '==', uid)
          .where('addInLibrary', '==', 1)
          .onSnapshot(
            (snap) => {
              snap.size > 0 && dispatch(getExercises({ limit: 10 }))
            },
            (err) => {
              checkMessage(400, err.message)
            }
          )
    })

    !isAuthenticated && router.push('/')
  }, [isAuthenticated, activeId])
  if (!isAuthenticated) return <Loading />

  return (
    currentUser && (
      <DndProvider backend={HTML5Backend}>
        <DashboardLayout
          user={currentUser}
          logout={handleLogout}
        >
          <DragDrop
            boxes={boxes}
            user={currentUser}
            libraries={library}
            workspace={currentWorkout}
            isDropped={isDropped}
            droppedBoxNames={droppedBoxNames}
            setDroppedBoxNames={setDroppedBoxNames}
            bins={bins}
          />
          <Library
            workoutId={currentWorkout && currentWorkout.id}
            isDropped={isDropped}
            libraries={library}
          />
        </DashboardLayout>
      </DndProvider>
    )
  )
}

export default memo(AdminPage)
