// @flow
import * as React from 'react'
import { CheckContainer } from './style'
import { FC, memo } from 'react'

type Props = {
  children: any
  checked: boolean
}
const CheckPick: FC<Props | any> = (props) => {
  return <CheckContainer {...props}>{props.children}</CheckContainer>
}
export default memo(CheckPick)
