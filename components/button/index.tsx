// @flow
import * as React from 'react'
import { CustomButton } from './styled'
import { memo } from 'react'

type Props = {
  size?: any
  children?: any
}
const Button: any = (props: Props) => {
  return <CustomButton {...props}>{props.children}</CustomButton>
}
export default memo(Button)
