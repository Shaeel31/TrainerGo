import React, { CSSProperties, memo } from 'react'
import { ConnectDropTarget, DropTarget, DropTargetMonitor } from 'react-dnd'

const style: CSSProperties = {
  width: '100%',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
}

export interface DustbinProps {
  accepts?: string[] | any
  lastDroppedItem?: any
  onDrop?: (item: any) => void | any
  blocks?: any
  exercises?: any
  // Collected Props
  canDrop?: boolean | any
  isOver?: boolean | any
  connectDropTarget?: ConnectDropTarget | any
}

export const withBin: any = (WrappedComponent, _height = '100%') => {
  const ComponentWithExtraInfo: React.ComponentType<DustbinProps> = (props) => {
    const { isOver, canDrop, connectDropTarget } = props
    const isActive = isOver && canDrop
    // let backgroundColor = '#1c1c1e'
    let backgroundColor = 'transparent'
    let height = 'auto'
    if (isActive) {
      backgroundColor = '#3cff8f'
      height = _height
    } else if (canDrop) {
      backgroundColor = 'rgba(60,255,143,0.09)'
      height = _height
    }
    return connectDropTarget(
      <div
        ref={connectDropTarget}
        style={{ ...style, backgroundColor, height }}
        role="Dustbin"
      >
        {isActive && 'Release to drop'}
        <WrappedComponent {...props} />
      </div>
    )
  }
  return DropTarget(
    (props: DustbinProps) => props.accepts,
    {
      drop(props: DustbinProps, monitor: DropTargetMonitor) {
        props.onDrop(monitor.getItem())
      },
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  )(memo(ComponentWithExtraInfo))
}
