import React, { FC, memo } from 'react'
import { SideBar } from './sidebar'
import { DashboardContent } from './content'
import { LayoutContainer } from './style'
import { useDimensions } from '../../components/useDimensions'

type Props = {
  logout?: any
  user?: any
}
const DashboardLayout: FC<Props | any> = ({ user, logout, children }) => {
  const [, height] = useDimensions()
  return (
    <LayoutContainer height={height}>
      <SideBar username={user?.name.slice(0, 6)} profileImage={user?.profileImage} logout={logout} />
      <DashboardContent>{children}</DashboardContent>
    </LayoutContainer>
  )
}

export default memo(DashboardLayout)
