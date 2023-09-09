import React, { memo, useEffect, useState } from 'react'
import { Badge, Button, message, Tabs } from 'antd'
import _ from 'lodash'
import { PlusOutlined } from '@ant-design/icons'
import { Panel } from './content'
import {
  FilterIcon,
  LibraryButtons,
  LibraryContainer,
  LibrarySection,
  MainPanel,
  PanelControl,
  PanelControls,
  SearchFiletContainer
} from './styled'
import Title from 'antd/lib/typography/Title'
import { Search } from '../../components/search-input'
import { useDimensions } from '../../components/useDimensions'
import { Selection } from '../../components/selection'
import CButton from '../../components/button'
import Filters from '../filters'
import SelectMode from '../../screens/selectMode'
import { useDispatch, useSelector } from 'react-redux'
import {
  filterExercises,
  searchBlock,
  searchExercise,
  searchWorkout
} from '../../store/library/actions'
import ExerciseSettings from '../../screens/exerciseSettings'
import {
  addNewCustomExercise,
  delBlock,
  delWorkout,
  edit_Exercise
} from '../../store/workspace/actions'
import { Menu } from '../../components/menu'
import PreviewScreen from '../../screens/previewScreen'
import { RootState } from '../../store/reducers'
import { Confirm } from '../../components/confirm'
import {
  getCurrentExercise,
  onCurrentExerciseChange
} from '../../store/workout'
import { saveItWorkoutData } from '../../reduxServices/workoutServices'
import { delete_Exercise } from '../../store/workspace/actions';
import { useRouter } from 'next/router'


const { TabPane } = Tabs
type Props = {
  workouts?: any
  blocks?: any
  exercises?: any
  libraries?: any
  isDropped?: any
  workoutId?: any
}

interface Filter {
  bodyWeightId?: any[]
  limit?: number
  suspensionTrainerId?: any
  resistanceBandId?: any
  homeAppliencesId?: any
}

interface Request {
  id?: any
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
  addedInLibrary?: 1
  reps?: any
  addTime?: any
  splitInterval?: any
  bodyWeightId?: any
  resistanceBandId?: any
  suspensionTrainerId?: any
  homeAppliencesId?: any
}

const custom_exercise: Request = {
  mainTitle: 'untitle',
  altTitle: 'untitle',
  mainInstructions: 'untitle',
  altInstructions: 'untitle',
  mainTechnicalYtLink: '',
  mainDemoYtLink: '',
  altTechnicalYtLink: '',
  altDemoYtLink: '',
  addedInLibrary: 1,
  duration: '00:00', //seconds
  reps: '10',
  splitInterval: 0, //seconds,
  suspensionTrainerId: '1',
  resistanceBandId: '1',
  homeAppliencesId: '1',
  bodyWeightId: '1'
}

const Library = (props: Props) => {
  const router = useRouter()
  const { libraries, isDropped, workoutId } = props
  const [, height] = useDimensions()
  const { currentWorkout: activeWorkout, currentExercise,currentWorkout } = useSelector(
    (state: RootState) => state.workout
  )

  const [visible, setVisible] = useState(false)
  const [savingLoading,setSavingLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)
  const [onDouble, setOnDouble] = useState(false)
  const [show, setShow] = useState(false)
  const [meta, setMeta] = useState<Request>({})
  const [totalFilters, setTotalFilters] = useState(0)
  const [filterItems, setFilterItems] = useState<Filter>({
    bodyWeightId: [],
    homeAppliencesId: [],
    suspensionTrainerId: [],
    limit: 10,
    resistanceBandId: []
  })
  // const [state, setSate] = useState<Request>(custom_exercise)
  const [sure, setSure] = useState<{ consent: boolean; item: any }>({
    consent: false,
    item: null
  })

  function onChange(e: any) {
    // console.log({ [e.target.id.split('-')[0]]: e.target.value })
    dispatch(
      onCurrentExerciseChange({ [e.target.id.split('-')[0]]: e.target.value })
    )
    // setSate({ ...state, [e.target.id.split('-')[0]]: e.target.value })
  }

  function onMetaChange(e: any) {
    dispatch(
      onCurrentExerciseChange({ [e.target.id.split('-')[0]]: e.target.value })
    )
    setMeta({ ...meta, [e.target.id.split('-')[0]]: e.target.value })
  }

  const dispatch = useDispatch()
  const openFilters = () => {
    setVisible(true)
  }
  const onClose = () => {
    //TODO Send filter items data to service {filterItems} here
    dispatch(filterExercises(filterItems))
    setVisible(false)
  }

  const onOpenCockpit = () => {
    setSavingLoading(true)
    saveItWorkoutData(currentWorkout,workoutId)
      .then(()=>{
        setSavingLoading(false)
        router.push({
          pathname: '/begin-workout',
          query: { id: workoutId },
        })
        // setOpen(true)
      })
   
  }
  const onCancelCockpit = () => {
    setOpen(false)
  }

  const onPreviewCancel = () => {
    setOpenPreview(false)
  }
  const handleSearchWorkouts = (e, sort = 0) => {
    dispatch(searchWorkout({ limit: 10, searchText: e.target.value, sort }))
  }
  const handleSearchBlocks = (e, sort = 0) => {
    dispatch(searchBlock({ limit: 10, searchText: e.target.value, sort }))
  }
  const handleSearchExercise = (e, sort = 0) => {
    dispatch(searchExercise({ limit: 10, searchText: e.target.value, sort }))
  }

  const onDoubleClick = (exercise) => {
    // setMeta(exercise)
    console.log("exercise",exercise)
    dispatch(getCurrentExercise(exercise))
    setOnDouble(true)
  }

  const onBlockDoubleClickDelete = (item) => {
    setSure({ consent: true, item })
    // console.log('want to delete', item)
  }
  const onDeleteConfirm = () => {
    if (sure.item.accepts == 'block') {
      dispatch(delBlock({ blockId: sure?.item?.id }))
    } else if (sure.item.accepts == 'workout') {
      dispatch(delWorkout({ workoutId: sure?.item?.id }))
    }
    setSure({ consent: false, item: null })
  }
  const onDeleteCancel = () => {
    setSure({ consent: false, item: null })
  }

  const workouts = (
    <Panel
      onDoubleClick={onBlockDoubleClickDelete}
      data={libraries.getWorkouts}
      isDropped={isDropped}
    />
  )
  const blocks = (
    <Panel
      onDoubleClick={onBlockDoubleClickDelete}
      data={libraries.getBlocks}
      isDropped={isDropped}
    />
  )
  const exercises = (
    <Panel
      data={libraries.getExercises}
      onDoubleClick={onDoubleClick}
      isDropped={isDropped}
    />
  )
  const filter = <img src='/icons/filter.svg' />
  const searchFilter = <img src='search-filter.svg' />

  const handleCheck = (id: string, value: any) => {
    if (totalFilters < 10) {
      setFilterItems({
        ...filterItems,
        [id]: value
      })
    } else {
      message.info('cannot add more than 10 filters')
    }
  }
  const onClear = () => {
    setFilterItems({
      ...filterItems,
      bodyWeightId: [],
      homeAppliencesId: [],
      suspensionTrainerId: [],
      limit: 10,
      resistanceBandId: []
    })
  }
  useEffect(() => {
    setTotalFilters(
      filterItems.bodyWeightId.length +
      filterItems.homeAppliencesId.length +
      filterItems.suspensionTrainerId.length +
      filterItems.resistanceBandId.length
    )
  }, [filterItems])

  const handleCustomExercise = () => {
    dispatch(getCurrentExercise(custom_exercise))
    setShow(!show)
  }

  function onCancel() {
    setShow(false)
    setOnDouble(false)
  }

  function onExerciseSubmit(exerciseObj) {
    dispatch(addNewCustomExercise(exerciseObj))
    setShow(false)
  }

  function onExerciseChanged(ex) {
    dispatch(
      edit_Exercise({
        workoutId,
        type: 0,
        saveFeature: 0,
        exerciseId: ex?.id,
        ...ex
      })
    )
    setOnDouble(false)
  }

  function handleChangeSort(which, value) {
    const _dispatch: any = {
      '0': handleSearchWorkouts,
      '1': handleSearchBlocks,
      '2': handleSearchExercise
    }
    _dispatch[which]({ target: { value: '' } }, value)
  }

  const onLibraryBlockDelete = (exerciseId, workoutId) => {
    dispatch(delete_Exercise({ exerciseId, workoutId }))
    setOnDouble(false)
  }

  return (
    <>
      <LibraryContainer height={height}>
        <LibrarySection>
          <Title level={2}>Library</Title>
          <Tabs centered>
            <TabPane tab='Workouts' key='1'>
              <Search
                placeholder='Search For a Workout'
                onChange={handleSearchWorkouts}
              />
              <PanelControl>
                <Menu
                  menu={[
                    { id: 1, title: 'A-z' },
                    { id: 2, title: 'By Date' }
                  ]}
                  icon={filter}
                  onChange={(value) => handleChangeSort(0, value)}
                />
              </PanelControl>
              <MainPanel>{workouts}</MainPanel>
            </TabPane>
            <TabPane tab='Blocks' key='2'>
              <Search
                placeholder='Search For a Blocks'
                onChange={handleSearchBlocks}
              />
              <PanelControl>
                <Menu
                  menu={[
                    { id: 1, title: 'A-z' },
                    { id: 2, title: 'By Date' }
                  ]}
                  icon={filter}
                  onChange={(value) => handleChangeSort(1, value)}
                />
              </PanelControl>
              <MainPanel>{blocks}</MainPanel>
            </TabPane>
            <TabPane tab='Exercises' key='3'>
              <div>
                <SearchFiletContainer>
                  <Search
                    placeholder='Search For a Exercise'
                    onChange={handleSearchExercise}
                  />
                  <Badge offset={[-16, 5]} count={totalFilters} size='small'>
                    <FilterIcon icon={searchFilter} onClick={openFilters} />
                  </Badge>
                  <Filters
                    filterItems={filterItems}
                    visible={visible}
                    onChange={handleCheck}
                    onClear={onClear}
                    onClose={onClose}
                  />
                </SearchFiletContainer>
                <PanelControls>
                  <CButton
                    shape='round'
                    size='small'
                    icon={<PlusOutlined />}
                    onClick={handleCustomExercise}
                  >
                    Add custom exercise
                  </CButton>
                  <Menu
                    menu={[
                      { id: 1, title: 'A-z' },
                      { id: 2, title: 'By Date' }
                    ]}
                    icon={filter}
                    onChange={(value) => handleChangeSort(2, value)}
                  />
                  <Selection />
                </PanelControls>
              </div>
              <MainPanel>{exercises}</MainPanel>
            </TabPane>
          </Tabs>
        </LibrarySection>
        <LibraryButtons>
          {/* <Button type='primary' size='large' shape='round' ghost>
            Edit Scenes
          </Button> */}
          <Button
            type='link'
            size='large'
            shape='round'
            disabled={_.isEmpty(activeWorkout)}
            onClick={() => setOpenPreview(true)}
          >
            Preview
          </Button>
          <Button
            type='primary'
            size='large'
            shape='round'
            onClick={onOpenCockpit}
            loading={savingLoading}
          >
            Beginn Workout
          </Button>
          {/* <SelectMode
            workoutId={workoutId}
            onCancel={onCancelCockpit}
            open={open}
          /> */}
        </LibraryButtons>
      </LibraryContainer>
      <Confirm
        title={
          <p style={{ textAlign: 'center', margin: 0, padding: 0 }}>
            Are you sure want to delete
          </p>
        }
        visible={sure.consent}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        okText='Delete'
        cancelText='Cancel'
      />
      <ExerciseSettings
        meta={currentExercise}
        onOk={() => onExerciseSubmit(currentExercise)}
        onChange={onChange}
        onCancel={onCancel}
        open={show}
      />
      <ExerciseSettings
        meta={currentExercise}
        onOk={() => onExerciseChanged(currentExercise)}
        onChange={onMetaChange}
        onCancel={onCancel}
        onDelete={() => onLibraryBlockDelete(currentExercise.id, workoutId)}
        open={onDouble}
      />
      <PreviewScreen
        activeWorkout={activeWorkout}
        visible={openPreview}
        onCancel={onPreviewCancel}
      />
    </>
  )
}
export default memo(Library)
