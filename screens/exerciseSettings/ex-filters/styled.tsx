import styled from 'styled-components'
import { Button } from 'antd'

export const ExContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: 10px;
  background-color: #1c1c1e;
  padding:15px;
  height:100%;
  margin: 15px 0 0;
`
export const ExHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ant-typography {
    color: #ffffff;
  }
  .ant-btn-round.ant-btn-sm {
    margin: 0 5px 10px auto;
    width: 80px;
    font-size:11px;
    display: block;
    color: #66ffa3;
    &:hover, 
    &:focus {
        color: #000;
        background: #66ffa3;
    }
  }
`
export const ExContent = styled.div`
  height: 100% !important;
  overflow: auto;
`

export const ClearBtn = styled(Button)`
     border-radius: 24px;
    margin: 0 0 10px auto;
    &.ant-btn {
      width:100px;
    }
`