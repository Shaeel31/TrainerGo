import styled from 'styled-components'
import { Card } from 'antd'

export const CustomCard = styled(Card)`
  border: none;
  width: 100%;
  height: auto;
  .ant-card-body {
    padding: 12px 0 0;
    border-color: transparent;
    height: auto;
  }
  .ant-card-cover {
    width: 100%;
    height: 106px;
    border-radius: 15px;
    overflow: hidden;
    background-color: #d8d8d8;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .ant-card-meta-description {
    color: #ffffff;
    font-size: 14px;
  }
`
