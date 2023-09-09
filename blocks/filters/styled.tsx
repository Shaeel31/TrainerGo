import styled from 'styled-components'
import { Checkbox, Drawer } from 'antd'

export const FilterList = styled.div`
  .ant-typography {
    font-size: 15px;
  }

  margin-bottom: 12px;
`
export const FilterItem: any = styled(Checkbox.Group)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;

  .ant-checkbox-wrapper:first-child {
    //padding-left: 8px;
  }

  .ant-typography {
    margin-left: 12px;
    font-size: 15px;
  }

  span {
    font-size: 1.3em;
    color: #ffffff;
  }
`
export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  button {
    margin-bottom: 0;
    margin-left: 12px;
  }
`
export const CustomDrawer = styled(Drawer)`
  .ant-typography {
    font-size: 1.4em;
  }

  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
  }

  h3 {
    margin: 0;
    color: #ffffff;
  }

  .ant-drawer-content-wrapper {
    min-width: 300px !important;
  }

  .ant-drawer-body {
    padding-top: 6px;
  }

  .ant-drawer-content {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    padding: 38px 12px;
  }

  .ant-drawer-header {
    display: flex;
    align-items: center;
  }

  .ant-drawer-content,
  .ant-drawer-header {
    border-bottom: none;
    background: #121214;
  }
`
