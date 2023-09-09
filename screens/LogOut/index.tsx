// @flow
import * as React from 'react'
import { SubscriptionContainer, Title, Description, SubscribeBtn } from './styled'
import { memo } from 'react'
import { userLogout } from '../../store/users/actions'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';

const LogOut = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogout = () => {
      dispatch(userLogout(router))
      router.push('/')
    }
  return (
    <SubscriptionContainer>
      <Title>Log Out</Title>
      <Description>Your unsaved data wil be lost after log out.</Description> 
      <SubscribeBtn type="primary" onClick={handleLogout}>Log out</SubscribeBtn>
    </SubscriptionContainer>
  )
}
export default memo(LogOut)
