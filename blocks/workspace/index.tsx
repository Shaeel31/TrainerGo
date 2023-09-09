import * as React from 'react'
import { CSSProperties, FC, memo } from 'react'
import { ConnectDropTarget, DropTarget, DropTargetMonitor } from 'react-dnd'
import { WorkSpaceContainer } from './styled'
import { AddWorkout } from '../../components/addWorkout'
import { addWorkout } from '../../store/workspace'
import { useDispatch } from 'react-redux'

const style: CSSProperties = {
  height: '100%',
  width: '100%',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

export interface DustbinProps {
  accepts?: string[] | any
  lastDroppedItem?: any
  onDrop?: (item: any) => void | any
  blocks?: any
  exercises?: any
  current?: any
  // Collected Props
  children?: any
  canDrop?: boolean | any
  isOver?: boolean | any
  connectDropTarget?: ConnectDropTarget | any
}

const WorkSpaceItem: FC<DustbinProps> = memo(function Dustbin({
  accepts,
  current,
  isOver,
  canDrop,
  connectDropTarget,
  children,
}) {
  const isActive = isOver && canDrop
  const dispatch = useDispatch()
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return connectDropTarget(
    <div
      ref={connectDropTarget}
      style={{ ...style, backgroundColor }}
      role="Dustbin"
    >
      <WorkSpaceContainer>
        <div>
          {isActive ? 'Release to drop' : `This dustbin accepts: ${accepts}`}
        </div>
        {!current ? (
          <AddWorkout onClick={() => dispatch(addWorkout())} />
        ) : (
          <div>{current.title}</div>
        )}
        {current && <div>{children}</div>}
        {/*{lastDroppedItem && <>{children}</>}*/}
        {/*<div>{children}</div>*/}
      </WorkSpaceContainer>
    </div>
  )
})

export const WorkSpaceBin = DropTarget(
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
)(WorkSpaceItem)
