import {
  CSSProperties,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import Title from 'antd/lib/typography/Title'
import {
  ActionsSection,
  CheckSection,
  ExerciseContainer,
  ExerciseInner,
  GroupExercise,
  GroupExerciseContainer,
  GroupExercisePanel,
  GroupInside,
  GroupSection,
  GroupTitleSection,
  MenuSection,
  RepsSection,
  SectionButton,
  SubTitle,
  TimeSection,
  TitleSection,
  Duration
} from './styled'
import Editable from '../../components/editField'
import { Confirm } from '../../components/confirm'
import ExerciseSettings from '../../screens/exerciseSettings'
import Time from '../../components/add-time'
import { RootState } from '../../store/reducers'
import { edit_Exercise, copy_Exercise, delete_Exercise } from '../../store/workout/actions'
import { exerciseEdit, getCurrentExercise, onCurrentExerciseChange } from '../../store/workout'

const style: CSSProperties = {
  cursor: 'move'
}

interface Request {
  mainTitle?: any
  altTitle?: any
  mainInstructions?: any
  altInstructions?: any
  mainTechnicalYtLink?: any
  mainDemoYtLink?: any
  altTechnicalYtLink?: any
  altDemoYtLink?: any
  duration?: any
  comboExercises?: any
  reps?: any
  addTime?: any
  splitInterval?: any
  bodyWeightId?: any
  resistanceBandId?: any
  suspensionTrainerId?: any
  homeAppliencesId?: any
}

export interface CardProps {
  id: any
  text?: string
  icon?: any
  listenChange?: any
  moveCard: (draggedId: string, id: string) => void
  style?: any
  exercise: Exercise
  workoutId?: any
  handleUnGroup?: any
  handleChange?: any
  blockId?: any
  checked?: boolean
}

const _data = {}
export const ExerciseElement: FC<CardProps> = memo(
  ({
     id,
     exercise,
     moveCard,
     handleUnGroup,
     checked,
     handleChange,
     workoutId,
     blockId
   }) => {
    const ref = useRef(null)
    const [{ isDragging, handlerId }, connectDrag] = useDrag({
      type: 'card',
      item: { id },
      collect: (monitor) => {
        const result = {
          handlerId: monitor.getHandlerId(),
          isDragging: monitor.isDragging()
        }
        return result
      }
    })

    const [, connectDrop] = useDrop({
      accept: 'card',
      hover({ id: draggedId }: { id: string; type: string }) {
        if (draggedId !== id) {
          moveCard(draggedId, id)
        }
      }
    })

    connectDrag(ref)
    connectDrop(ref)
    const opacity = isDragging ? 1 : 1
    const border = isDragging ? '1px dashed gray' : 'none'
    const containerStyle = useMemo(
      () => ({ ...style, opacity, border: border }),
      [border]
    )
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [state, setSate] = useState<Request>(exercise)
    const [show, setShow] = useState(false)
    const { currentExercise } = useSelector(
      (state: RootState) => state?.workout
    )

    const [collapsed, setCollapsed] = useState([])

    function onChange(e: any) {
      const value = currentExercise[e.target.id.split('-')[0]] == e.target.value ? "" : e.target.value 
      console.log("onChange",value,currentExercise[e.target.id.split('-')[0]])
      dispatch(
        exerciseEdit({
          blockId,
          data: {
            id: currentExercise?.id,
            ...currentExercise,
            [e.target.id.split('-')[0]]: value
          }
        })
      )
      //
      // dispatch(
      //   edit_Exercise({
      //     workoutId,
      //     blockId,
      //     exerciseId: currentExercise.id,
      //     ...currentExercise,
      //     [e.target.id.split('-')[0]]: e.target.value
      //   })
      // )

      dispatch(
        onCurrentExerciseChange({ [e.target.id.split('-')[0]]: value })
      )
      // setSate({ ...state, [e.target.id.split('-')[0]]: e.target.value })
    }

    function onEditChange(e, addedInLibrary, workoutId, blockId, exerciseId) {
      // console.log({ [e.target.id.split('-')[0]]: e.target.value })
      const _change = {
        ...exercise,
        [e.target.id.split('-')[0]]: e.target.value
      }
      dispatch(
        exerciseEdit({
          blockId,
          data: {
            id: exerciseId,
            ..._change,
            type: 1,
            saveFeature: 1
          }
        })
      )

      dispatch(
        edit_Exercise({
          workoutId,
          blockId,
          exerciseId,
          ..._change,
          type: 1,
          saveFeature: 0
        })
      )
    }

    useEffect(() => {
      setSate(exercise)
    }, [exercise])

    const handleCopy = (workoutId: any, blockId: any, exerciseId: any) => {
      dispatch(copy_Exercise({ exercise, workoutId, blockId, exerciseId }))
    }

    const handleDelete = (workoutId: any, exerciseId: any) => {
      dispatch(delete_Exercise({ exerciseId, workoutId, blockId }))
      setShow(false)
      setOpen(false)
    }

    const onCancel = () => {
      setOpen(false)
    }

    const onCancelExerciseSettings = (workoutId, blockId, exerciseId) => {
      dispatch(
        exerciseEdit({
          blockId,
          data: {
            id: exerciseId,
            ...currentExercise,
            type: 1,
            saveFeature: 1
          }
        })
      )

      dispatch(
        edit_Exercise({
          workoutId,
          blockId,
          exerciseId,
          ...currentExercise,
          type: 1,
          saveFeature: 1
        })
      )

      setShow(false)
      setOpen(false)
    }
    const onConfirmSettings = (workoutId, blockId, exerciseId) => {
      dispatch(
        exerciseEdit({
          blockId,
          data: {
            id: exerciseId,
            ...currentExercise,
            type: 2,
            saveFeature: 1
          }
        })
      )

      dispatch(
        edit_Exercise({
          workoutId,
          blockId,
          exerciseId,
          ...currentExercise,
          type: 2,
          saveFeature: 1
        })
      )

      setShow(false)
      setOpen(false)
    }
    // blockId,
    //   type,
    //   saveFeature
    const onSubmitExerciseSettings = (
      addedInLibrary,
      workoutId,
      blockId,
      exerciseId
    ) => {
      if (addedInLibrary === 0) {
        dispatch(
          exerciseEdit({
            blockId,
            data: {
              id: exerciseId,
              ...currentExercise,
              type: 0,
              saveFeature: 1
            }
          })
        )

        dispatch(
          edit_Exercise({
            workoutId,
            blockId,
            exerciseId,
            ...currentExercise,
            type: 0,
            saveFeature: 1
          })
        )

        setSate(null)
        setOpen(false)
      } else {
        setShow(true)
      }
    }

    const onUpdateExerciseSettings = (
      addedInLibrary,
      workoutId,
      blockId,
      exerciseId
    ) => {
      console.log("currentExercise",currentExercise)
      if (addedInLibrary === 0) {
        dispatch(
          exerciseEdit({
            blockId,
            data: {
              id: exerciseId,
              ...currentExercise,
              type: 0,
              saveFeature: 0
            }
          })
        )

        dispatch(
          edit_Exercise({
            workoutId,
            blockId,
            exerciseId,
            ...currentExercise,
            type: 0,
            saveFeature: 0
          })
        )

        setSate(null)
        setOpen(false)
      } else {
        setShow(true)
      }
    }

    // const [check, setCheck] = useState(false)

    function onGroupIcon(e, id) {
      const [_key] = e
      _key !== undefined ? (_data[id] = id) : delete _data[id]
      setCollapsed(Object.values(_data))
    }

    //
    // const handleCheck = (id: any) => {
    //   setCheck(!check)
    //   dispatch(!check ? makeGroup(id) : makeUnGroup(id))
    // }
    //
    // const tick = check ? '/icons/active-tick.svg' : '/icons/tick.svg'
    const simpleExercise = () => {
      return (
        <ExerciseInner>
          <CheckSection
            value={exercise?.id}
            checked={checked}
            onChange={(id) => handleChange(id, blockId)}
          />
          <TitleSection>
            <SubTitle>
              <label>main: </label>
              <Editable
                max={25}
                font={18}
                text={exercise.mainTitle}
                onChange={(str) =>
                  onEditChange(
                    {
                      target: {
                        id: 'mainTitle',
                        value: str
                      }
                    },
                    exercise.addedInLibrary,
                    workoutId,
                    blockId,
                    exercise.id
                  )
                }
              />
              {/*<Title level={3}> {exercise.mainTitle}</Title>*/}
            </SubTitle>
            <SubTitle>
              <label>mod: </label>
              <Editable
                max={25}
                font={16}
                text={exercise.altTitle}
                onChange={(str) =>
                  onEditChange(
                    {
                      target: {
                        id: 'altTitle',
                        value: str
                      }
                    },
                    exercise.addedInLibrary,
                    workoutId,
                    blockId,
                    exercise.id
                  )
                }
              />
              {/*<Title level={3}> {exercise.altTitle}</Title>*/}
            </SubTitle>
          </TitleSection>
          <RepsSection>
            <SubTitle>
              <label>reps: </label>
              <Editable
                max={3}
                font={16}
                text={exercise.reps}
                onChange={(str) =>
                  onEditChange(
                    {
                      target: {
                        id: 'reps',
                        value: str
                      }
                    },
                    exercise.addedInLibrary,
                    workoutId,
                    blockId,
                    exercise.id
                  )
                }
              />
            </SubTitle>
          </RepsSection>
          <TimeSection>
            <SubTitle>
              {/*<Title level={3}>{exercise.duration}</Title>*/}

              <Time
                content={
                    {
                      '1': 'ALT',
                      '2': 'L',
                      '3': 'R'
                    }[exercise?.splitInterval]
                  //exercise?.splitInterval ? (exercise?.isLeft ? 'L' : 'R') : ''
                }
                value={exercise?.duration}
                onChange={(e, str) =>
                  onEditChange(
                    {
                      target: {
                        id: 'duration',
                        value: str
                      }
                    },
                    exercise.addedInLibrary,
                    workoutId,
                    blockId,
                    exercise.id
                  )
                }
              />
            </SubTitle>
          </TimeSection>
          <ActionsSection>
            <SectionButton
              icon={<img src='/icons/copy.svg' alt='copy' />}
              onClick={() => handleCopy(workoutId, blockId, exercise.id)}
            />
            <SectionButton
              icon={<img src='/icons/delete.svg' alt='del' />}
              onClick={() => handleDelete(workoutId, exercise.id)}
            />
            <SectionButton
              icon={<img src='/icons/dots.svg' alt='filter' />}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(getCurrentExercise(exercise))
                setOpen(true)
              }}
            />
          </ActionsSection>
          <MenuSection>
            <SectionButton icon={<img src='/icons/menu.svg' alt='menu' />} />
          </MenuSection>
          <Confirm
            text={`Do you want to save this ${exercise?.mainTitle} exercise?`}
            visible={show}
            onConfirm={() => onConfirmSettings(workoutId, blockId, exercise.id)}
            onCancel={() =>
              onCancelExerciseSettings(workoutId, blockId, exercise.id)
            }
          />
          <ExerciseSettings
            meta={currentExercise}
            onDelete={() => handleDelete(workoutId, exercise.id)}
            onOk={() =>
              onSubmitExerciseSettings(
                currentExercise?.addedInLibrary,
                workoutId,
                blockId,
                currentExercise?.id
              )
            }
            onUpdate={() =>
              onUpdateExerciseSettings(
                exercise.addedInLibrary,
                workoutId,
                blockId,
                exercise.id
              )}
            onChange={onChange}
            onCancel={onCancel}
            open={open}
          />
        </ExerciseInner>
      )
    }

    const comboExercise = useCallback(
      (comboParentId, comboExerciseIds, _keys) => {
        const onUnGroup = (e) => {
          e.stopPropagation()
          handleUnGroup(comboParentId, comboExerciseIds, workoutId, blockId)
        }
        return (
          <ExerciseInner>
            <GroupSection onClick={onUnGroup}>
              <img src='/icons/group.svg' alt='group icon' />
            </GroupSection>
            <GroupTitleSection>
              <Title level={3}>{exercise.mainTitle}</Title>
            </GroupTitleSection>
            <RepsSection></RepsSection>
            <TimeSection>
              <SubTitle>
                <Title level={3}>{exercise.duration}</Title>
                {/*<label>:L </label>*/}
              </SubTitle>
            </TimeSection>
            <ActionsSection>
              <SectionButton
                icon={<img src='/icons/copy.svg' alt='copy' />}
                onClick={() => handleCopy(workoutId, blockId, exercise.id)}
              />
              <SectionButton
                icon={<img src='/icons/delete.svg' alt='del' />}
                onClick={() => handleDelete(workoutId, exercise.id)}
              />
              <SectionButton
                icon={
                  <img
                    src={
                      _keys.includes(exercise.id)
                        ? '/icons/group-down.svg'
                        : '/icons/group-up.svg'
                    }
                    alt='filter'
                  />
                }
              />
            </ActionsSection>
            <MenuSection>
              <SectionButton icon={<img src='/icons/menu.svg' alt='menu' />} />
            </MenuSection>
            <ExerciseSettings
              meta={currentExercise}
              onDelete={() => handleDelete(workoutId, exercise.id)}
              onOk={() =>
                onSubmitExerciseSettings(
                  exercise.addedInLibrary,
                  workoutId,
                  blockId,
                  exercise.id
                )
              }
              onUpdate={() =>
                onUpdateExerciseSettings(
                  exercise.addedInLibrary,
                  workoutId,
                  blockId,
                  exercise.id
                )}
              onChange={onChange}
              onCancel={onCancel}
              open={open}
            />
          </ExerciseInner>
        )
      },
      [exercise]
    )

    const groupExercise = useCallback(
      (id, comboExerciseIds, _keys) => {
        return (
          <GroupExerciseContainer ghost onChange={(e) => onGroupIcon(e, id)}>
            <GroupExercisePanel
              header={comboExercise(id, comboExerciseIds, _keys)}
              key='1'
              // showArrow={onGroupIcon}
            >
              {exercise.comboExercises &&
              exercise.comboExercises.map((ex, idx) => (
                <GroupExercise key={idx}>
                  <div />
                  <GroupInside>
                    <TitleSection>
                      <SubTitle>
                        <label>main: </label>
                        <Title level={3}> {ex.mainTitle}</Title>
                      </SubTitle>
                      <SubTitle>
                        <label>mod: </label>
                        <Title level={3}> {ex.altTitle}</Title>
                      </SubTitle>
                    </TitleSection>
                    <RepsSection>
                      <SubTitle>
                        <label>reps: </label>
                        <Title level={3}>{ex.reps}</Title>
                      </SubTitle>
                    </RepsSection>
                    <TimeSection>
                      <SubTitle>
                        <Duration>
                        <Title level={3}>{ex.duration}</Title>
                        </Duration>
                        {/*<label>:L </label>*/}
                      </SubTitle>
                    </TimeSection>
                    <ActionsSection>
                      <SectionButton
                        icon={<img src='/icons/copy.svg' alt='copy' />}
                        onClick={() => handleCopy(workoutId, blockId, ex.id)}
                      />
                      <SectionButton
                        icon={<img src='/icons/delete.svg' alt='del' />}
                        onClick={() => handleDelete(workoutId, ex.id)}
                      />
                      <SectionButton
                        icon={<img src='/icons/dots.svg' alt='filter' />}
                        onClick={() => setOpen(true)}
                      />
                    </ActionsSection>
                    <MenuSection>
                      <SectionButton
                        icon={<img src='/icons/menu.svg' alt='menu' />}
                      />
                    </MenuSection>
                    <ExerciseSettings
                      meta={currentExercise}
                      onDelete={() => handleDelete(workoutId, exercise.id)}
                      onOk={() =>
                        onSubmitExerciseSettings(
                          exercise.addedInLibrary,
                          workoutId,
                          blockId,
                          exercise.id
                        )
                      }
                      onUpdate={() =>
                        onUpdateExerciseSettings(
                          exercise.addedInLibrary,
                          workoutId,
                          blockId,
                          exercise.id
                        )}
                      onChange={onChange}
                      onCancel={onCancel}
                      open={open}
                    />
                  </GroupInside>
                </GroupExercise>
              ))}
            </GroupExercisePanel>
          </GroupExerciseContainer>
        )
      },
      [exercise]
    )

    const _rest = (
      <ExerciseInner>
        <CheckSection
          value={exercise.id}
          checked={checked}
          onChange={(id) => handleChange(id, blockId)}
        />
        <GroupTitleSection>
          <Title level={3}>Rest</Title>
        </GroupTitleSection>
        <RepsSection></RepsSection>
        <TimeSection>
          <SubTitle>
            <Title level={3}>{exercise.duration}</Title>
          </SubTitle>
        </TimeSection>
        <ActionsSection>
          <SectionButton
            icon={<img src='/icons/copy.svg' alt='copy' />}
            onClick={() => handleCopy(workoutId, blockId, exercise.id)}
          />
          <SectionButton
            icon={<img src='/icons/delete.svg' alt='del' />}
            onClick={() => handleDelete(workoutId, exercise.id)}
          />
        </ActionsSection>
        <MenuSection>
          <SectionButton icon={<img src='/icons/menu.svg' alt='menu' />} />
        </MenuSection>
        <ExerciseSettings
          meta={currentExercise}
          onDelete={() => handleDelete(workoutId, exercise.id)}
          onOk={() =>
            onSubmitExerciseSettings(
              exercise.addedInLibrary,
              workoutId,
              blockId,
              exercise.id
            )
          }
          onUpdate={() =>
            onUpdateExerciseSettings(
              exercise.addedInLibrary,
              workoutId,
              blockId,
              exercise.id
            )}
          onChange={onChange}
          onCancel={onCancel}
          open={open}
        />
      </ExerciseInner>
    )
    console.log("currentExercise2",currentExercise)
    return (
      <ExerciseContainer
        ref={ref}
        style={containerStyle}
        data-handler-id={handlerId}
      >
        {exercise.comboType === 0
          ? exercise.type === 2
            ? _rest
            : simpleExercise()
          : groupExercise(
            exercise.id,
            exercise?.comboExercises?.map((i) => i.id),
            collapsed
          )}
      </ExerciseContainer>
    )
  }
)
