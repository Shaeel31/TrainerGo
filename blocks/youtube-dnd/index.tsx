import { memo } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { YouTubeBin } from './youtubeBin'
import { YouCard } from './YoutubeCard'

const YoutubeDrag = ({ dustbins, handleDrop, isDropped, boxes }) => {
  // { accepts: [ItemTypes.youtube], lastDroppedItem: null },
  // { accepts: [ItemTypes.alt], lastDroppedItem: null },
  // { accepts: [ItemTypes.main, ItemTypes.alt, ItemTypes.youtube], lastDroppedItem: null }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <YouTubeBin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {boxes.map(({ name, type }, index) => (
          <YouCard
            item={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </DndProvider>
  )
}
export default memo(YoutubeDrag)
