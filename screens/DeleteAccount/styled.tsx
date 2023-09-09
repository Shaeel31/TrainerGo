import styled from 'styled-components'
import { ModalContainer } from '../../blocks/ModelFullView/styled'
import { Input, Button } from 'antd'
import { FC } from 'react'
import { InputProps } from 'antd/lib/input'

export const CockpitScreenContainer: any = styled(ModalContainer)`
  background: transparent;
  .ant-modal-content{
     background: #21212194;
     .ant-modal-body{
        margin:0 auto;
        max-width: 520px;
        width: 100%;
        background: #212121;
        text-align:center;
     }
  }
  .ant-modal-footer {
    display: none !important;
    background: #5a5a5a !important;
  }
`
export const ScreenContainer = styled.div`
  display: grid;
  gap: 25px;
  text-align:center;
`

export const Title = styled.h3`
    color:#fff;
    font-size: 28px;
    margin: 0;
`
export const SubTitle = styled.p`
    color: #6d6d6d;
    font-size: 14px;
    font-weight:600;
`

export const WarningText = styled.p`
    color: #ffffff;
    font-size: 14px;
    margin: 30px 0;
`

export const DeleteBtn: any  = styled(Button)`
     border-radius: 24px;
    margin: 0 0 30px;
    &.ant-btn-primary {
      background: #FF0000;
    }
`

export const CancelBtn: any  = styled(Button)`
     border-radius: 24px;
      margin: 0 10px 30px 0;
      &.ant-btn{
        color:#6d6d6d;
      }
`

export const FormControl = styled.div`
    margin: 0 auto 40px;
    max-width: 230px;
`

export const InputLabel = styled.label`
    padding: 0;
    color: #6d6d6d;
    font-size: 12px !important;
    margin: 0px 0 -8px;
    display:block;
    text-align: left;
`

export const FormInput: FC<InputProps> = styled(Input)`
  border-bottom: solid 1px #6d6d6d !important;
  color: #6d6d6d !important;
  &:focus, 
  &.ant-input-focused {
      border: none;
      box-shadow: none;
  }
`