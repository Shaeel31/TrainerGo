import styled from 'styled-components'
import { Input } from 'antd'

const { Search } = Input

export const SearchBar = styled(Search)`
  background: #000000;
  padding: 2px;
  border-radius: 100px;
  width: 100%;

  .ant-input-wrapper {
    display: grid !important;
    grid-template-columns: auto 40px !important;
  }

  .ant-input-search-button {
    background: rgba(73, 196, 75, 0.16) !important;
    color: #3cff8f !important;
    width: 40px;
    border-radius: 100px !important;
  }
`
