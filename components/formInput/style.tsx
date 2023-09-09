import styled from 'styled-components'
import { Form, Input } from 'antd'

const { Item } = Form

export const CustomInput = styled(Input)`
  border: none;
  background: none;
  border-bottom: solid 1px #29292b;
  :focus {
    border-bottom: 1px solid #13be05;
    outline: 0;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
`
export const CustomItem = styled(Item)``
