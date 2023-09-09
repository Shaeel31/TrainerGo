import { TimePicker } from 'antd'
import styled from 'styled-components'

export const TimeContainer: any = styled(TimePicker)`
  background: transparent;
  padding: 0;
  border: none;
  .ant-picker-input {
    min-width: 60px;
  }
  ${(props: any) => `
    :after {
      content: '${props?.content ? props?.content : ''}';
      margin-left: 8px;
    }
  `}
  .ant-picker-panel-container {
    background-color: #1c1c1e !important;
  }
`
