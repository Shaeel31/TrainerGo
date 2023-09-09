// @flow
import * as React from 'react'
import { GroupContainer } from './styled'

type Props = {
  children?: any
}
export const GroupExercise = (props: Props) => {
  return <GroupContainer>{props.children}</GroupContainer>
}
