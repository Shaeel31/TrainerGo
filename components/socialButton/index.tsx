import * as React from 'react'
import { FC } from 'react'
import { Button } from 'antd'

type Props = {
  icon?: any
  style?: any
}
export const Social: FC<Props | any> = (props) => {
  const { icon, style } = props
  return (
    <Button
      type="primary"
      style={{ backgroundColor: '#000000', border: 'none', ...style }}
      shape="circle"
      icon={icon}
      size="large"
    />
  )
}
