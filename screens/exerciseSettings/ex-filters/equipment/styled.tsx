import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'

export const EquipmentBox = styled.div`
  overflow: hidden;

  .ant-checkbox {
    order: 1;
  }

  .ant-checkbox-group {
    width: 100% !important;
  }

  .ant-typography {
    //margin-bottom: 8px;
  }
`
export const EquipmentGroup = styled(Checkbox.Group)`
  .ant-checkbox-wrapper-checked {
    span {
      color: #3cff8f;
      border-radius: 50%;
      border: none;
    }
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    box-shadow: none !important;

    border: none !important;
  }
  .ant-checkbox-disabled{
    opacity:0;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin:0;
  }
`
export const EquipmentItem: any = styled(Checkbox)`
  width: 100% !important;
  padding: 4px 0;
  color: #ffffff;
  display: flex;
  justify-content: space-between;

  span.ant-checkbox + * {
    padding: ${(props: any) => (props.padding ? props.padding : 0)};
    font-size: 16px !important;
  }

  .ant-checkbox-inner {
    height: 15px;
    width: 15px;
    padding: 0;
    border-color: transparent !important;
    :after {
      box-shadow: none !important;
      border-radius: 0 !important;
      top: -1px;
      left: -1px;
      background-color: transparent;
      background-image: url('/icons/drop-tick.svg');
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
      height: 15px;
      width: 15px;
      transform:none;
      border:none;
    }
  }
`
