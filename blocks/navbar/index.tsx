import * as React from 'react'
import { FC, useRef, useState } from 'react'
import { Menu, Tooltip } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'


const navigation = require('./navigation.json').navigation
type Props = {
  collapsed?: boolean
}
export const Navigation: FC<Props | any> = (props) => {
  const ref = useRef(null)
  const router = useRouter()
  return (
    <Menu
      ref={ref}
      mode="inline"
      inlineCollapsed={props.collapsed}
    >
      {navigation.map((item) => {
        const Icon = require(`../../public/icons/${item.icon}`).default
        const icon =
          props.collapsed && item.disabled ? (
            <Tooltip placement="right" title="coming soon" className="tooltip">
              <div className="my-icon-wrapper test">
              <Link href={item.link}>
                <a>
                <Icon id="icos" />
                </a>
              </Link>
              </div>
            </Tooltip>
          ) : (
            <div className="my-icon-wrapper test">
              <Link href={item.link}>
                <a>
                  <Icon id="icos" />
                </a>
              </Link>
            </div>
          )
        return (
          <Menu.Item
            key={item.id}
            id={item.id}
            icon={icon}
            className={item.link == router.asPath ? "ant-menu-item-selected" : ""}
            disabled={item.disabled}
          >
                {item.disabled ? (
                  <Tooltip
                    placement="right"
                    title="coming soon"
                    className="tooltip"
                  >
                    <div className="my-icon-wrapper test">{item.title}</div>
                  </Tooltip>
                ) : (
                  <Link href={item.link}>
                    <a>
                      {item.title}
                      {item.count && (
                        <>
                          | <b style={{ color: '#3cff8f' }}>{item.count}</b>
                        </>
                      )}
                    </a>
                  </Link>
                )}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}
