import * as React from 'react'
import { EditCustom } from './styled'
import { memo } from 'react'

type Props = {
  text: string
  onChange?: any
  max_height?: any
  size?: any
}
const Editable = (props: Props | any) => {
  const { text, onChange, content, width, max_height, size, max, row_max } = props
  const editable = {
    icon: '',
    tooltip: true,
    // editing: true,
    maxLength: max ? max : 20,
    autoSize: { maxRows: row_max ? row_max : 1 },
    onStart: null,
    onChange: onChange,
    onCancel: null,
    onEnd: null,
  }
  return (
    <EditCustom
      width={width}
      max_height={max_height}
      content={content}
      font={size}
      editable={editable}
      {...props}
    >
      {text?.toString()}
    </EditCustom>
  )
}
export default memo(Editable)
