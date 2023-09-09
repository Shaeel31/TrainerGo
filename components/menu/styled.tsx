import styled from 'styled-components'

export const MenuContainer = styled.div`
  .ant-select {
    width: 40px !important;
    height: auto !important;
    display: flex;
    align-items: center;
    justify-content: center;
    //border: 1px solid #262626;
    border-radius: 10px;
  }
  .ant-select-selector {
    //background-color: red !important;
    border: none !important;
  }
  .ant-select-selection-item {
    display: none;
  }
  .ant-select-arrow {
    border: none;
    top: 25%;
    left: 4px;
    right: 0;
  }
`
