import styled from 'styled-components'
import { Select } from 'antd'

const { Option } = Select
export const SelectionControl = styled(Select)`
  //.ant-select-selector{
  //  border-radius: 100px !important;
  //  padding: 0 !important;
  //  height: 20px !important;
  //}
  // .ant-select-selection-item{
  //   //background: red;
  //   height: auto !important;
  // }
  // .ant-select-selection-search{
  //   padding: 0 !important;
  //   height: auto !important;
  // }
  width: 87px !important;
  height: 20px !important;
  //.ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow

  .ant-select-selector {
    padding-right: 40px !important;
    border-radius: 100px !important;
    border-color: #434343 !important;
    height: 20px !important;
  }
  .ant-select-selection-item {
    padding-right: 60px !important;
  }
  h3.ant-typography {
    color: #ffffff;
  }

  //.ant-select-single .ant-select-selector .ant-select-selection-item
  .ant-select-selection-item {
    height: 20px;
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
    //padding: 0 30px 0 0;
    right: 0;
    line-height: 1.6 !important;
    //display: flex;
    //align-items: flex-start;
  }

  .ant-select-arrow {
    top: 8px;
    right: 14px;
    padding-left: 8px;
    //width: auto;
    //height: auto;
  }

  //content: url("/icons/arrow.svg");
  .ant-select-arrow .anticon {
    background: rgba(174, 205, 70, 0.2);

    //display: flex;
    //justify-content: center;
    //align-items: center;
    border-radius: 10px;
    color: #29d97b;
  }

  .ant-select-arrow .anticon > svg {
  }

  @media (max-width: 1336px) {
    .ant-input {
      font-size: 14px;
    }
    .ant-typography {
      //width: 40px !important;
      //overflow:hidden !important;
      //white-space:nowrap !important;
      //text-overflow: ellipsis !important;
    }
  }
`
export const OptionControl = styled(Option)`
  //background: red;
  //height: auto !important;
  //padding: 0 !important;
`
