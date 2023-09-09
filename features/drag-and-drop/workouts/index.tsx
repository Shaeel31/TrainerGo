// @flow
import * as React from 'react'
import { withBin } from '../index'
import { WorkContainer } from './styled'
import { memo } from 'react'

type Props = {
  children?: any
  current?: any
  onClick?: any
}
const Index = (props: Props) => {
  const { current, children } = props
  return <WorkContainer>{current ? children : null}</WorkContainer>
}
export const WorkOut = withBin(memo(Index), '100vh')
