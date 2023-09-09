// @flow
import * as React from 'react'
import { Fragment, useState } from 'react'
import {
  AddBtn,
  BlockBtn,
  BtnBottom,
  BtnContainer,
  BtnHoverTop,
  RestBtn,
} from './styled'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import { addNewBlockService, rest_Block } from '../../store/workspace/actions'
import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { addNewBlock, restBlock } from '../../store/workout/actions'
//
// type Props = {}
const AddBlock = ({ current }) => {
  const [state, setState] = useState<{ visible: boolean }>({ visible: false })
  const dispatch = useDispatch()

  const onBlock = (workoutId) => {
    dispatch(addNewBlock({ workoutId }))
    // dispatch(addNewBlockService({ workoutId }))
  }

  const onRest = (workoutId) => {
    dispatch(restBlock({ workoutId, duration: 30 }))
  }

  const hide = () => {
    setState({
      visible: false,
    })
  }

  const handleVisibleChange = (visible) => {
    setState({ visible })
  }
  return (
    <BtnContainer>
      {state.visible ? (
        <Fragment>
          <BtnHoverTop>
            <BlockBtn
              size="small"
              shape="round"
              title="Add Block"
              icon={<PlusOutlined />}
              onClick={() => onBlock(current?.id)}
            >
              Add Block
            </BlockBtn>
            <RestBtn
              size="small"
              shape="round"
              icon={<PlusOutlined />}
              onClick={() => onRest(current?.id)}
            >
              Add Rest
            </RestBtn>
          </BtnHoverTop>
          <BtnBottom>
            <AddBtn
              onClick={hide}
              shape="circle"
              size="large"
              icon={<PlusOutlined />}
            />
          </BtnBottom>
        </Fragment>
      ) : (
        <Button
          shape="circle"
          type="primary"
          size="large"
          onClick={handleVisibleChange}
          icon={<PlusOutlined />}
        />
      )}
    </BtnContainer>
  )
}
export default memo(AddBlock)
