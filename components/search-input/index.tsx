import React, { FC } from 'react'
import { CustomSearch } from './style'
import { SearchOutlined } from '@ant-design/icons/lib'

export const Search: FC<any> = (props) => {
  return (
    <CustomSearch
      placeholder=" Search..."
      prefix={<SearchOutlined />}
      enterButton={false}
      {...props}
    />
  )
}
