import styled from 'styled-components'
import { Radio } from 'antd'

export const GeneralCardContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: #1c1c1e;
`
export const InternalTitle = styled.div`
  h3 {
    color: #ffffff;
  }
`
export const SoundContainer = styled.div`
  .ant-radio {
    display: flex;
    justify-content: flex-end;
    order: 1;
  }

  .ant-typography {
    margin-bottom: 8px;
  }
`
export const SoundGroup: any = styled(Radio.Group)`
  .ant-radio-wrapper-checked {
    span {
      color: #3cff8f !important;
    }
  }
  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none !important;

    border: none !important;
  }
`
export const Sound = styled(Radio)`
  width: 100% !important;
  padding: 4px 0;
  color: #ffffff;

  .ant-radio-inner {
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
    }
  }
`
