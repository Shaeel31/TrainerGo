import * as React from 'react'
import { memo, useState } from 'react'
import { withBin } from '../index'
import {
  WorkoutActions,
  WorkoutDetailsBar,
  WorkoutTitle,
  WorkSpaceAddWorkout,
  WorkSpaceContainer,
  WorkSpaceMenu,
  WorkSpaceSection,
  WorkSpaceTitle
} from './styled'
import { Confirm } from '../../../components/confirm'
import { AddWorkout } from '../../../components/addWorkout'
import Editable from '../../../components/editField'
import { useDispatch, useSelector } from 'react-redux'

import {
  editWorkoutTitle,
  workout_Settings
} from '../../../store/workspace/actions'

import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { WorkoutSettings } from '../../../blocks/workoutSettings'
import { getBase64 } from '../../../libs/image'
import { RootState } from '../../../store/reducers'
import { editWorkout, setActiveId, workoutClose } from '../../../store/workout'
import { clearActiveWorkout, updateWorkoutId } from '../../../store/users'
import { saveWorkout } from '../../../store/workout/actions'

interface Request {
  exerciseColorId?: any
  exerciseSoundId?: any
  restColorId?: any
  restSoundId?: any
  volume?: any
  preparationTime?: any
  ticks?: any
  image?: string
}

type Props = {
  children?: any
  current?: any
  onClick?: any
}

const Index = (props: Props) => {
  const { children, current, onClick } = props
  const [state, setState] = useState(false)
  const [visible, setVisible] = useState(false)
  const { loading } = useSelector((state: RootState) => state.workspace)
  const dispatch = useDispatch()

  const [image, setImage] = useState<{
    loading: boolean
    imageUrl: any
  }>({
    loading: false,
    imageUrl: null
  })

  const handleImageChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setImage({ ...image, loading: true })
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage({
          imageUrl,
          loading: false
        })
        dispatch(
          editWorkout({ workoutId: current.id, ...current, image: imageUrl })
        )
        dispatch(editWorkoutTitle({ workoutId: current.id, image: imageUrl }))
      })
    }
  }

  const onChange = (e) => {
    dispatch(
      editWorkout({
        workoutId: current.id,
        ...current,
        [e.target.id.split('-')[0]]: e.target.value
      })
    )
    dispatch(
      editWorkoutTitle({
        workoutId: current.id,
        [e.target.id.split('-')[0]]: e.target.value
      })
    )
  }

  const onOpen = () => {
    setVisible(!visible)
  }

  const handleChange = (str: string) => {
    dispatch(editWorkout({ workoutId: current.id, ...current, title: str }))
    dispatch(editWorkoutTitle({ workoutId: current.id, title: str }))
  }

  const onSubmitWorkoutSettings = () => {
    dispatch(workout_Settings({ workoutId: current.id, ...current }))
    setVisible(false)
  }

  const handleClose = (workoutId) => {
    if (!state) {
      dispatch(workoutClose({ workoutId }))
      dispatch(clearActiveWorkout())
      dispatch(setActiveId(null))
      dispatch(updateWorkoutId(null))
    }
  }
  const handleSave = (workoutId) => {
    if (current?.addedInLibrary === 0) {
      dispatch(saveWorkout({ workout: current, workoutId, type: 0 }))
    } else {
      setState(true)
    }
  }

  const onConfirm = (workoutId) => {
    dispatch(saveWorkout({ workout: current, workoutId, type: 2 }))
    setState(false)
  }

  const onCancel = (workoutId) => {
    dispatch(saveWorkout({ workout: current, workoutId, type: 1 }))
    setState(false)
  }

  const handleSetting = () => {
    setVisible(true)
  }

  const add_workout = (
    <WorkSpaceAddWorkout>
      <AddWorkout onClick={onClick} />
    </WorkSpaceAddWorkout>
  )

  return (
    <WorkSpaceContainer>
      {current ? (
        <WorkSpaceSection>
          <WorkSpaceMenu>
            <WorkSpaceTitle>
              <WorkoutTitle>
                <Editable
                  size={18}
                  text={current?.title}
                  onChange={handleChange}
                />
              </WorkoutTitle>
              <WorkoutActions>
                <Button
                  icon={<img src='icons/filter2.svg' alt='filter' />}
                  onClick={handleSetting}
                />
                <Button
                  disabled={loading}
                  icon={<img src='icons/saveIcon.svg' alt='save' />}
                  onClick={() => handleSave(current.id)}
                />
                <Button
                  icon={<img src='icons/delete.svg' alt='delete' />}
                  onClick={() => handleClose(current.id)}
                />
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleClose(current.id)}
                />
              </WorkoutActions>
            </WorkSpaceTitle>
            <WorkoutActions>
              <div>
                <img src='icons/back.svg' alt='download' />
              </div>
              <div>
                <img src='icons/forward.svg' alt='delete' />
              </div>
            </WorkoutActions>
          </WorkSpaceMenu>
          <WorkoutDetailsBar>
            <span>
              <b>{current.totalTime}</b>
              <p>total time</p>
            </span>
            <span>
              <b>{current.totalBlocks}</b>
              <p>blocks</p>
            </span>
            <span>
              <b>{current.totalExercises}</b>
              <p>exercises</p>
            </span>
            <span>
              <p>description</p>
              <b>{current.description}</b>
            </span>
          </WorkoutDetailsBar>
          {children}
        </WorkSpaceSection>
      ) : (
        add_workout
      )}
      <Confirm
        text={`Do you want to save this ${current?.title} workout?`}
        visible={state}
        onConfirm={() => onConfirm(current.id)}
        onCancel={() => onCancel(current.id)}
      />

      <WorkoutSettings
        onOk={onSubmitWorkoutSettings}
        current={current}
        visible={visible}
        data={current}
        onChange={onChange}
        loading={image.loading}
        handleImage={handleImageChange}
        onOpen={onOpen}
      />
    </WorkSpaceContainer>
  )
}
export const WorkSpace = withBin(memo(Index))
