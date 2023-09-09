// @flow
import * as React from 'react'
import { withBin } from '../../features/drag-and-drop'

type Props = {
  children?: any
}
const Dusty = (props: Props) => {
  const { children } = props
  return <div>{children}</div>
}

export const DustyBin = withBin(Dusty)
