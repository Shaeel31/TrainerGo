import { createGlobalStyle } from 'styled-components'
import { memo } from 'react'

const GlobalStyle = createGlobalStyle`

  ::-webkit-scrollbar {
    width: 1px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000000;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #6d6d6d;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #6d6d6d;
  }

  .ant-checkbox-inner {
    background-color: transparent;
  }

  .ant-checkbox-checked {
    border: 1px solid rgba(109, 109, 109, 0.65);
    border-radius: 3px;
  }

  .ant-select-dropdown {
    width: auto !important;
    padding: 9px 14px 16px 13px;
    border-radius: 10px;
    background-color: #121214;
  }

  .ant-dropdown-menu {
    width: auto !important;
    padding: 9px 14px 16px 13px;
    border-radius: 10px;
    background-color: #121214;
  }

  .ant-select-item-option-active, .ant-select-item-option-selected {
    background: transparent !important;
    color: #3cff8f !important;

    :after {
      content: url("/icons/drop-tick.svg");
      margin-left: 8px;
      color: #3cff8f !important;
    }
  }

  .ant-picker-ranges {
    display: flex !important;
    justify-content: center !important;
    width: 100%;

    li {
      width: 100%;
    }

    button {
      width: 100%;
      min-width: 70%;
    }
  }

  .ant-typography-edit-content .ant-input {
    color: #ffffff !important;
    width: 100% !important;
    min-width: 60px;
  }

`
export default memo(GlobalStyle)
