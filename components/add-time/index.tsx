// @flow
import * as React from 'react'
import moment from 'moment'
import { TimeContainer } from './styled'
import { memo } from 'react'

type Props = {
  onChange?: any
  value?: any
  suffixIcon?: any
  content?: any
  clearIcon?: any
}
const Time = (props: Props | any) => {
  const { onChange, value, content } = props
  const format = 'mm:ss'

  return (
    <TimeContainer
      allowClear={false}
      content={content}
      showNow={false}
      secondStep={5}
      onChange={onChange}
      defaultValue={moment(value, format)}
      value={moment(value, format)}
      format={format}
    />
  )
}

export default memo(Time)
