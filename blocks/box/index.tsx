import { CSSProperties, FC, memo } from 'react'
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd'

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
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

const DragItemContainer: FC<BoxProps> = memo(function Box({
  isDropped,
  item,
  isDragging,
  connectDragSource,
}) {
  const opacity = isDragging ? 0.4 : 1
  return connectDragSource(
    <div role="Box" style={{ ...style, opacity }}>
      {isDropped ? <s>{item.id}</s> : item.id}
    </div>
  )
})

export const Box = DragSource(
  (props: BoxProps) => props.type,
  {
    beginDrag: (props: BoxProps) => ({ item: props.item }),
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)(DragItemContainer)
