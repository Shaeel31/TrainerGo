// @flow
import { Switch } from 'antd'
import React, { memo, useCallback, useState } from 'react'
import {
  Box,
  ExerciseSettingContainer,
  SettingBox,
  SettingBoxInner,
  SettingBoxInnerHeader,
  SettingGrid,
  TopFilters,
  DeleteExerciseBtn,
  AddTime,
  SaveBtn,
  ModalFooter,
  CancelBtn,
} from './styled'
import Title from 'antd/lib/typography/Title'
import ExFilters from './ex-filters'
import MainWindow from './main'
import YoutubeWindow from './youtube'
import Time from '../../components/add-time'
import update from 'immutability-helper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import { onCurrentExerciseChange } from '../../store/workout'
import { Select } from 'antd'

const { Option } = Select

interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
}

const ItemTypes = {
  youtube: 'youtube',
  alt: 'alt',
  main: 'main',
}

// interface BoxState {
//   name: string
//   type: string
// }

type Props = {
  children?: any
  open?: any
  onOk?: any
  onCancel?: any
  meta?: any
  onChange?: any
  onUpdate?: any
  onDelete?: any
}
const ExerciseSettings = (props: Props) => {
  const { open, onOk, onCancel, onChange, onUpdate, onDelete } = props
  const { youtubeData } = useSelector((state: RootState) => state?.workspace)
  const { currentExercise } = useSelector(
    (state: RootState) => state?.workout
  )
  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])
  const [interval, setInterval] = useState<number>(currentExercise?.splitInterval ? currentExercise?.splitInterval : 0)
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.youtube], lastDroppedItem: null },
    { accepts: [ItemTypes.youtube], lastDroppedItem: null },
    {
      accepts: [ItemTypes.main, ItemTypes.alt, ItemTypes.youtube],
      lastDroppedItem: null,
    },
  ])
  // const [boxes] = useState<BoxState[]>([
  //   { name: 'Bottle', type: ItemTypes.youtube },
  //   { name: 'Banana', type: ItemTypes.main },
  //   { name: 'Magazine', type: ItemTypes.alt },
  //   { name: 'Magazine', type: ItemTypes.main }
  // ])

  function isDropped(boxName: any) {
    // onChange({ target: { id: `image`, value: boxName?.image } })
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const dispatch = useDispatch()
  const handleDrop = useCallback(
    (index: number, item: any, id: string) => {
      if (id === 'main') {
        dispatch(
          onCurrentExerciseChange({
            image: item?.image,
          })
        )
      }else {
        dispatch(
          onCurrentExerciseChange({
            altImage: item?.image,
          })
        )
      }
      dispatch(
        onCurrentExerciseChange({
          [`${id}TechnicalYtLink`]: item[`${id}TechnicalYtLink`],
        })
        // saveinlibrary 
      )

      setDroppedBoxNames(
        update(droppedBoxNames, item ? { $push: [item] } : { $push: [] })
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      )
    },
    [droppedBoxNames, dustbins]
  )

  const handleChangeInterval = (e) => {
    dispatch( 
      onCurrentExerciseChange({
      splitInterval: e,
    }))
    setInterval(e)
  }

  const onRemoveAll = (removeItems) => {
    dispatch( 
      onCurrentExerciseChange(removeItems)
    )
  }

  return (
    <ExerciseSettingContainer
      visible={open}
      closable={true}
    >
      <SettingGrid>
        <SettingBox>
          <SettingBoxInnerHeader></SettingBoxInnerHeader>
          <SettingBoxInner>
              <Box>
                <TopFilters>
                  <AddTime padding="8px 14px">
                    <Title level={3}>add time</Title>
                      <Time
                        value={currentExercise?.duration}
                        onChange={(e, str) =>
                          onChange({ target: { id: 'duration', value: str } })
                        }
                      />
                  </AddTime>
                  <AddTime padding="8px 14px">
                  <Select
                    suffixIcon={<img src='/arrow.svg' alt='arrow' />}
                    defaultValue={interval}
                    bordered={false}
                    onSelect={handleChangeInterval}
                  >
                      <Option value={0}>Not Active</Option>
                      <Option value={1}>Alt</Option>
                      <Option value={2}>L</Option>
                      <Option value={3}>R</Option>
                  </Select>
                  </AddTime>
              </TopFilters>
                <ExFilters meta={currentExercise} onChange={onChange} onRemoveAll={onRemoveAll} />
            </Box>
          </SettingBoxInner>
        </SettingBox>
        <SettingBox>
          <SettingBoxInnerHeader>
            <Title level={2}>MAIN</Title>
          </SettingBoxInnerHeader>
          <SettingBoxInner>
            <MainWindow
              id="main"
              onChange={onChange}
              meta={currentExercise}
              index={0}
              lastDroppedItem={dustbins[0].lastDroppedItem}
              handleDrop={handleDrop}
              dustbins={dustbins}
            />
          </SettingBoxInner>
        </SettingBox>
        <SettingBox>
          <SettingBoxInnerHeader>
            <Title level={2}>MOD</Title>
          </SettingBoxInnerHeader>
          <SettingBoxInner>
            <MainWindow
              id="alt"
              onChange={onChange}
              meta={currentExercise}
              index={1}
              lastDroppedItem={dustbins[1].lastDroppedItem}
              handleDrop={handleDrop}
              dustbins={dustbins}
            />
          </SettingBoxInner>
        </SettingBox>
        <SettingBox>
          <SettingBoxInnerHeader></SettingBoxInnerHeader>
          <SettingBoxInner>
            <YoutubeWindow
              isDropped={isDropped}
              youtubeData={youtubeData}
              // boxes={boxes}
            />
          </SettingBoxInner>
        </SettingBox>
      </SettingGrid>
      <ModalFooter>
        {onDelete && <DeleteExerciseBtn onClick={onDelete}>Delete exercise</DeleteExerciseBtn>}
        <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
        {onUpdate && <SaveBtn type="primary" onClick={onUpdate}>Update</SaveBtn>}
        <SaveBtn type="primary" onClick={onOk}>Save as new</SaveBtn>
      </ModalFooter>
    </ExerciseSettingContainer>
  )
}
export default memo(ExerciseSettings)
