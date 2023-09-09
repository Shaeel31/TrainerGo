import * as React from 'react'
import { memo, useState } from 'react'
import { BlockActionsContainer } from '../styled'
import {
  ActionsSection,
  SectionButton,
} from '../../../blocks/exercise-block/styled'
import { useDispatch } from 'react-redux'
import { copy_Block, saveBlock } from '../../../store/workout/actions'
import { Confirm } from '../../confirm'
import { delBlock } from '../../../store/workout/actions'
import { deleteBlock } from '../../../store/workout'

const BlockActions = ({
  blockId,
  loading,
  workoutId,
  block,
  saveIcon = true,
}: any) => {
  const [state, setState] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (blockId, workoutId) => {
    dispatch(delBlock({ blockId, workoutId }))
    dispatch(deleteBlock({ blockId, workoutId }))
  }

  const handleCopy = (block, workoutId, blockId) => {
    dispatch(copy_Block({ block, workoutId, blockId }))
  }

  const handleSave = (block, workoutId, blockId) => {
    if (block.addedInLibrary === 0) {
      dispatch(saveBlock({ block, workoutId, blockId, type: 0 }))
    } else {
      setState(true)
    }
  }

  const onConfirm = (workoutId, blockId) => {
    dispatch(saveBlock({ block, workoutId, blockId, type: 2 }))
    setState(false)
  }

  const onCancel = (workoutId, blockId) => {
    dispatch(saveBlock({ block, workoutId, blockId, type: 1 }))
    setState(false)
  }
  return (
    <BlockActionsContainer>
      <ActionsSection>
        <SectionButton
          icon={<img src="/icons/copy.svg" alt="copy" />}
          onClick={() => handleCopy(block, workoutId, blockId)}
        />
        {saveIcon && (
          <SectionButton
            disabled={loading}
            icon={<img src="/icons/saveIcon.svg" alt="save" />}
            onClick={() => handleSave(block, workoutId, blockId)}
          />
        )}

        <SectionButton
          onClick={() => handleDelete(blockId, workoutId)}
          icon={<img src="/icons/delete.svg" alt="del" />}
        />
      </ActionsSection>
      <Confirm
        text={`Do you want to save ${block?.title} block?`}
        visible={state}
        onConfirm={() => onConfirm(workoutId, blockId)}
        onCancel={() => onCancel(workoutId, blockId)}
      />
    </BlockActionsContainer>
  )
}
export default memo(BlockActions)
