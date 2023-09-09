import { CSSProperties, FC, memo } from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget } from 'react-dnd'

const style: CSSProperties = {
  height: 'auto',
  width: 'auto',
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
  // Collected Props
  canDrop?: boolean | any
  isOver?: boolean | any
  connectDropTarget?: ConnectDropTarget | any
}

const DustbinItem: FC<DustbinProps> = memo(function Dustbin({
  accepts,
  isOver,
  canDrop,
  connectDropTarget,
  lastDroppedItem,
  blocks,
  exercises,
}) {
  const isActive = isOver && canDrop

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
      {isActive
        ? 'Release to drop'
        : `This dustbin accepts: ${accepts.join(', ')}`}

      {lastDroppedItem && (
        <>
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
          {blocks || exercises ? (
            <>
              <div>
                {blocks}
                {exercises}
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  )
})

export const Dustbin = DropTarget(
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
)(DustbinItem)
