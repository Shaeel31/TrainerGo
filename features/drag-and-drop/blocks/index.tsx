// @flow
import * as React from 'react'
import { withBin } from '../index'
import { BlockContainer } from './styled'
import { memo } from 'react'

type Props = {
  children?: any
}
const Index = (props: Props) => {
  const { children } = props
  return <BlockContainer>{children}</BlockContainer>
}
export const BlockSpace = withBin(memo(Index))
