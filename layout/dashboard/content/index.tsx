// @flow
import * as React from 'react'
import { ContentContainer } from './style'

type Props = {
  children?: any
}
export const DashboardContent = (props: Props) => {
  return <ContentContainer>{props.children}</ContentContainer>
}
