import * as React from 'react'
import { memo, useState } from 'react'
import {
  ActionSec,
  BlockContainer,
  BlockContent,
  BlockFooter,
  BlockTop,
  FooterButtons,
  FooterTime,
  IndexSec,
  OtherSec,
  SecContent
} from './styled'
import { Select } from 'antd'
import Counter from '../counter'
import BlockActions from './actions'
import Interval from '../interval-button'
import Editable from '../editField'
import { useDispatch, useSelector } from 'react-redux'
import { editBlockMeta } from '../../store/workspace/actions'
import Paragraph from 'antd/lib/typography/Paragraph'
import { RootState } from '../../store/reducers'
import { editBlock } from '../../store/workout'
import { addNewExercise, newRestExercise } from '../../store/workout/actions'
// import { getSeconds, getTotalSeconds } from '../../libs/time'

const { Option } = Select
const data = require('./data.json')

type Props = {
  index: number
  children: any
  block?: any
  workoutId?: any
  blockId?: any
}

const Block = (props: Props) => {
  const { blockId, workoutId, block } = props
  const [editableStr, setEditableStr] = useState(block?.title)
  const { loading } = useSelector((state: RootState) => state.workspace)
  const [format, setFormat] = useState(
    block?.formatId ? block?.formatId : 'none'
  )
  const dispatch = useDispatch()

  const handleChangeFormat = (formatId: any) => {
    setFormat(data.blocks.formats[formatId].id)
    dispatch(
      editBlockMeta({
        formatId,
        blockId: props?.block?.id
      })
    )

    dispatch(
      editBlock({
        data: {
          formatId
        },
        blockId: props?.block?.id
      })
    )
  }

  const handleChange = (str: string) => {
    setEditableStr(str)
    dispatch(
      editBlockMeta({
        title: str,
        blockId: props?.block?.id,
        workoutId: props?.workoutId
      })
    )

    dispatch(
      editBlock({
        data: {
          title: str
        },
        blockId: props?.block?.id
      })
    )
  }

  const handleAddRest = (workoutId, blockId) => {
    dispatch(newRestExercise({ workoutId, blockId, duration: 15 }))
  }

  const handleAddExercise = (blockId: any, workoutId: any) => {
    dispatch(addNewExercise({ workoutId, blockId }))
  }

  const handleRounds = (value: any) => {
    dispatch(
      editBlockMeta({
        rounds: value,
        blockId: props?.block?.id,
        workoutId: props?.workoutId
      })
    )
    dispatch(
      editBlock({
        data: { rounds: value },
        blockId: props?.block?.id
      })
    )
  }

  return (
    <BlockContainer>
      <BlockTop>
        <IndexSec>
          <p>{props?.index}</p>
        </IndexSec>
        <OtherSec>
          <Paragraph ellipsis={{ rows: 1, expandable: false }}>
            block name
          </Paragraph>
          <Editable size={14} text={editableStr} onChange={handleChange} />
        </OtherSec>
        <OtherSec>
          <Paragraph ellipsis={{ rows: 1, expandable: false }}>
            format
          </Paragraph>
          <SecContent>
            <Select
              suffixIcon={<img src='/arrow.svg' alt='arrow' />}
              defaultValue={format}
              bordered={false}
              onSelect={handleChangeFormat}
            >
              {Object.values(data?.blocks?.formats).map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item?.title}
                </Option>
              ))}
            </Select>
          </SecContent>
        </OtherSec>
        <OtherSec>
          <Paragraph ellipsis={{ rows: 1, expandable: false }}>
            rounds
          </Paragraph>
          <Counter
            max={100}
            rounds={props?.block?.rounds}
            onChange={handleRounds}
          />
        </OtherSec>
        <ActionSec>
          <BlockActions
            loading={loading}
            block={block}
            blockId={props?.block?.id}
            workoutId={props?.workoutId}
          />
        </ActionSec>
      </BlockTop>
      <BlockContent>{props?.children}</BlockContent>
      <BlockFooter>
        <FooterButtons>
          <Interval
            text='Add Interval'
            onClick={() => handleAddExercise(blockId, workoutId)}
          />
          <Interval
            text='Add Rest'
            onClick={() => handleAddRest(workoutId, blockId)}
          />
        </FooterButtons>
        <FooterTime>
          <h1>{block?.exerciseTotalTime}</h1>
        </FooterTime>
      </BlockFooter>
    </BlockContainer>
  )
}
export default memo(Block)
