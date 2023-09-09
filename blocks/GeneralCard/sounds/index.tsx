// @flow
import * as React from 'react'
import Paragraph from 'antd/lib/typography/Paragraph'
import { Sound, SoundContainer, SoundGroup } from '../styled'
import { memo } from 'react'

// type Props = {
//   sound?: any
// };

function Sounds({ id, sounds, onChange, value }: any) {
  return (
    <SoundContainer>
      <Paragraph>sound</Paragraph>
      <SoundGroup onChange={onChange} value={value}>
        {sounds.map((_sound, idx) => (
          <Sound
            key={idx}
            id={`${id}-${idx}`}
            name={_sound.title}
            value={_sound.id}
          >
            {_sound.title}
          </Sound>
        ))}
      </SoundGroup>
    </SoundContainer>
  )
}

export default memo(Sounds)
