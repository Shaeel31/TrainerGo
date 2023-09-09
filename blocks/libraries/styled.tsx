import styled from 'styled-components'
import { Button } from 'antd'

export const LibraryContainer: any = styled.div`
  //min-width: 450px;
  width: 450px;
  display: grid;
  grid-template-rows: auto 65px;
  padding-right: 8px;
  @media (max-width: 968px) {
    width: 350px;
  }
  @media (max-width: 768px) {
    width: 300px;
  }
`
export const LibraryButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  @media (max-width: 968px) {
    button {
      font-size: 12px !important;
      width: auto !important;
      height: auto !important;
      padding: 0 !important;
    }
  }
  @media (max-width: 768px) {
    button {
      font-size: 12px !important;
      width: auto !important;
      height: auto !important;
      padding: 0 !important;
    }
  }
`

export const LibrarySection = styled.div`
  padding: 23px;
  border-radius: 30px;
  height: 100%;
  background-color: #000000;
  text-align: center;
  .ant-tabs-nav::before {
    border: none;
  }
  .ant-tabs-nav-list {
    margin-bottom: 18px;
    background-color: #1c1c1e;
    border-radius: 100px;
    width: 234px;
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;
    overflow: hidden;
    .ant-tabs-tab-active {
      border-bottom: none !important;
      font-weight: bold;
      //max-width: 85px;
      height: 28px;
      color: #000c17;
      border-radius: 14px;
      background-color: #3cff8f;
      .ant-tabs-tab-btn {
        color: #000c17;
      }
    }
  }
  .ant-tabs-tab-btn {
    text-align: center;
    font-size: 14px;

    //background: purple;
    // min-width: 50px;
    width: 100%;
  }
  .ant-tabs-tab {
    text-align: center !important;
    margin: 0;
    padding: 0;
    color: #ededed;
  }
`
export const FilterIcon = styled(Button)`
  border: none;
  //padding: 6px 0;
  //img {
  //  height: 20px;
  //}
`
export const PanelControls = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  height: 50px;
`
export const PanelControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`

export const SearchFiletContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  .ant-badge-count {
    background: transparent;
    color: #ffffff;
    font-size: 10px;
  }
`

export const MainPanel = styled.div`
  height: calc(100vh - 295px);
  overflow: auto;
  width: auto;
  overflow-x: hidden;
`
