import { CSSProperties, FC, memo } from 'react'
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd'
import { Card } from 'antd'
import { CustomCard } from './styled'

const { Meta } = Card
const style: CSSProperties = {
  cursor: 'move',
  overflow: 'hidden',
}

export interface BoxProps {
  name: string
  type: string
  isDropped: boolean
  item?: any
  // Collected Props
  connectDragSource: ConnectDragSource
  isDragging: boolean
}

const LibCardContainer: FC<BoxProps> = memo(function Box({
  item,
  isDragging,

  connectDragSource,
}) {
  const opacity = isDragging ? 0.4 : 1
  const border = isDragging ? '1px dashed gray' : '0px solid gray'
  return connectDragSource(
    <div role="Box">
      <CustomCard
        hoverable
        style={{ ...style, opacity, border }}
        cover={
          <img alt={item?.id} src={item?.image ? item?.image : '/trener.jpg'} />
        }
      >
        <Meta title={item.title ? item.title : item.mainTitle} />
      </CustomCard>
    </div>
  )
})

export const LibCard = DragSource(
  (props: BoxProps) => props.type,
  {
    beginDrag: (props: BoxProps) => ({ item: props.item }),
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(LibCardContainer)
