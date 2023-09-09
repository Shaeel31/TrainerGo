// @flow
import * as React from 'react'
import { SubscriptionContainer, Title, Description, SubscribeBtn } from './styled'
import { memo } from 'react'


const Subscription = () => {

  return (
    <SubscriptionContainer>
      <Title>FancyBox</Title>
      <Description>Manage your subscription in TrainerGo with FancyBox</Description> 
      <SubscribeBtn type="primary">Manage Subscription</SubscribeBtn>
    </SubscriptionContainer>
  )
}
export default memo(Subscription)
