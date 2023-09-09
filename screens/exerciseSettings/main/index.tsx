// @flow
import * as React from 'react'
import { memo } from 'react'
import { MainContainer } from './styled'
import { YouTubeBin } from '../../../blocks/youtube-dnd/youtubeBin'

type Props = {
  title?: any
  id?: any
  meta?: any
  onChange?: any
  handleDrop?: any
  dustbins?: any
  lastDroppedItem?: any
  index?: any
}
const MainWindow = (props: Props) => {
  const { onChange, id, meta, handleDrop, index, lastDroppedItem } = props
  return (
    <MainContainer>
      <YouTubeBin
        id={id}
        onChange={onChange}
        meta={meta}
        accept={['youtube']}
        lastDroppedItem={lastDroppedItem}
        onDrop={(item) => handleDrop(index, item, id)}
      />
    </MainContainer>
  )
}
export default memo(MainWindow)
