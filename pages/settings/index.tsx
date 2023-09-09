import * as React from 'react'
import { memo } from 'react'
import DashboardLayout from '../../layout/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import { userLogout } from '../../store/users/actions'
// import { clearOnLogout } from '../../store/workspace'
import { Tabs } from 'antd';
import { Container, TabsContainer, UserName } from "./styled"
import  PersonalSettings from "./../../screens/Personal"
import  Subscription from "./../../screens/Subscription"
import  LogOut from "./../../screens/LogOut"


const { TabPane } = Tabs;

const Settings: any = () => {

  const {
    users: { currentUser },
  } = useSelector((state: RootState) => state)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <DashboardLayout
      user={currentUser}
      logout={handleLogout}
    >
      <Container>
        <TabsContainer>
          <UserName>Hello, {currentUser?.name}</UserName>
          <Tabs defaultActiveKey="0" tabPosition='left'>
            <TabPane tab="Personal" key="0">
               <PersonalSettings />
            </TabPane>
            <TabPane tab="Subscription" key="1">
                <Subscription />
            </TabPane>
            <TabPane tab="Log Out">
               <LogOut />
            </TabPane>
        </Tabs>
        </TabsContainer>
      </Container>
    </DashboardLayout>
  )
}

export default memo(Settings)
