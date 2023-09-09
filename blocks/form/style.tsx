import styled from 'styled-components'
import Form from 'antd/lib/form/Form'

export const FormContainer = styled(Form)`
  .ant-input {
    color: #ffffff;
  }
  .ant-form-item-explain-error {
    text-align: right;
    color: #ff0000 !important;
    //border-color: #ff0000 !important;
    //border-top: 2px solid #ff0000 !important;
    //border-bottom: none !important;
  }
  .ant-form-item-has-error {
  }

  .ant-form-item-has-error .ant-input {
    border-color: #ff0000 !important;
    background: transparent;
  }
`
