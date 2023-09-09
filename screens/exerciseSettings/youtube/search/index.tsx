// @flow
import * as React from 'react'
import { SearchBar } from './styled'

// type Props = {}
export const YoutubeSearch = ({ onSearch }) => {
  //const onSearch = (value) => {}

  return (
    <SearchBar
      placeholder="Search Exercise..."
      //onChange={onChange}
      onSearch={onSearch}
    />
  )
}
