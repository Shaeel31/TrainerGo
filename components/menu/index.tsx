// @flow
import * as React from 'react'
import { Select } from 'antd'

import { FilterIcon } from '../../blocks/libraries/styled'
import { MenuContainer } from './styled'

type Props = {
  icon: any
  onChange?: any
  menu: any[]
}
const { Option } = Select

export const Menu = (props: Props) => {
  const { menu, icon, onChange } = props

  return (
    <MenuContainer
    // overlay={_menu}
    // trigger={['click']}
    // placement="bottomCenter"
    // arrow
    // onVisibleChange={onChange}
    >
      <Select
        defaultValue="lucy"
        suffixIcon={<FilterIcon icon={icon} />}
        style={{ width: 120 }}
        onChange={onChange}
      >
        {menu.map((item: any, idx) => (
          <Option key={idx} value={item?.id}>
            {item.title}
          </Option>
        ))}
      </Select>
    </MenuContainer>
  )
}
