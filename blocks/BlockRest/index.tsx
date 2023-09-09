// @flow
import * as React from 'react'
import { BlockRestContainer, RestActions, RestTime, RestTitle } from './styled'
import BlockActions from '../../components/block/actions'
import { memo } from 'react'

type Props = {
  children?: any
  block?: any
  workoutId?: any
}
const BlockRest = (props: Props) => {
  const { block } = props
  return (
    <BlockRestContainer>
      <RestTitle>{block.title}</RestTitle>
      <RestTime>{block.duration}</RestTime>
      <RestActions>
        <BlockActions
          saveIcon={false}
          block={block}
          blockId={props.block.id}
          workoutId={props.workoutId}
        />
      </RestActions>
    </BlockRestContainer>
  )
}
export default memo(BlockRest)
