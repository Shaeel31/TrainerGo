import React, { FC, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import {
  ProfileAvatar,
  ProfileBottom,
  ProfileHeader,
  SearchStyle,
  SideContainer,
  TrenerGOLogo,
} from './style'
import { Dropdown, Menu } from 'antd'
import { Navigation } from '../../../blocks/navbar'
import { Search } from '../../../components/search-input'
import Title from 'antd/lib/typography/Title'
import Link from 'next/link'

type Props = {
  username?: any
  logout?: any
  children?: any
}
export const SideBar: FC<Props | any> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [update, setUpdate] = useState(null)
  const logo = collapsed ? '/logo.svg' : 'text-logo.svg'
  useEffect(() => {
    const media = window.matchMedia(`(max-width: 1336px)`)
    media.addEventListener('change', (e) => setUpdate(e))

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
    return () => media.removeEventListener('change', (e) => setUpdate(e))
  }, [update])

  const menu = (
    <Menu>
      <Menu.Item>Profile Settings</Menu.Item>
      <Menu.Item onClick={props.logout}>Sign Out</Menu.Item>
    </Menu>
  )

  const router = useRouter();

  return (
    <SideContainer>
      <ProfileHeader>
        <TrenerGOLogo source={logo} />
      </ProfileHeader>
      <SearchStyle>
        <Search size="large" />
      </SearchStyle>
      <Navigation collapsed={collapsed} />
      <ProfileBottom>
        <Dropdown overlay={menu} placement="bottomRight">
          <Link href="/settings">
            <a className={router.asPath == "/settings" ? "active" : ""}>
              <ProfileAvatar source={props?.profileImage ? props.profileImage : "/profile.png"} />
            </a>
          </Link>
        </Dropdown>
        {!collapsed && (
          <Title level={2}>
            {props.username}
          </Title>
        )}
      </ProfileBottom>
    </SideContainer>
  )
}
