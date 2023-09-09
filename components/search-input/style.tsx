import styled from 'styled-components'
import Search from 'antd/lib/input/Search'

export const CustomSearch = styled(Search)`
  width: 100%;
  .ant-input-group-addon {
    display: none;
  }
  .anticon {
    font-size: 1.1em;
  }
  .ant-input {
    border: none;
    width: 100% !important;
    background: transparent;
    :focus-visible {
      outline: 0;
    }
  }
  .ant-input-affix-wrapper {
    width: auto;
    display: flex;
    align-items: center;
    border: none;
    height: 34px;
    padding-left: 12px;
    border-radius: 100px !important;
    background-color: #121214 !important;
    overflow: hidden;
  }
`
