// @flow
import * as React from 'react'
import { GeneralCardContainer, InternalTitle } from './styled'
import Title from 'antd/lib/typography/Title'
import { memo } from 'react'

type Props = {
  children?: any
  title?: string
}
const GeneralCard = (props: Props | any) => {
  const { title, children } = props

  return (
    <GeneralCardContainer {...props}>
      <InternalTitle>
        <Title level={3}>{title}</Title>
      </InternalTitle>
      {children}
    </GeneralCardContainer>
  )
}
export default memo(GeneralCard)
