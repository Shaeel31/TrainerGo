import styled from 'styled-components'
import { Input, Form, Button } from 'antd'
import { FC } from 'react'
import { InputProps } from 'antd/lib/input'



export const UserProfile = styled.div`
    background:#000;
    border-radius: 24px;
    padding: 25px 35px;
`

export const FormContainer = styled(Form)`
  .ant-input {
    color: #6d6d6d !important;
  }
  .ant-input-focused,
  .ant-input:focus,
  .ant-input-affix-wrapper:focus, 
  .ant-input-affix-wrapper-focused {
      border:none;
      box-shadow: none;
  }
  .ant-input-affix-wrapper{
    border-bottom: solid 1px #6d6d6d !important;
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

export const InputTitle = styled.h3`
    color:#fff;
    font-size: 24px;
    margin: 30px 0 20px;
`

export const FormControl: any = styled(Form.Item)`
    margin: 0 0 20px;
    display: block;
    .ant-form-item-label{
        padding: 0;
        color: #6d6d6d;
        font-size: 12px !important;
        margin: 0px 0 -8px;
        display:block;
        text-align: left;
    }
    .ant-btn-primary{
        margin: 30px 0 0;
        border-radius: 22px;
    }
    .ant-input-affix-wrapper:focus, 
    .ant-input-affix-wrapper-focused,
    .ant-input:focus, .ant-input-focused {
        border: none;
        box-shadow: none;
    }
    .ant-input-affix-wrapper{
        border-bottom: solid 1px #6d6d6d !important;
    }
`

export const InputLabel = styled.label`
    padding: 0;
    color: #6d6d6d;
    font-size: 12px !important;
    margin: 0px 0 -8px;
    display:block;
`

export const FormInput: FC<InputProps> = styled(Input)`
  border-bottom: solid 1px #6d6d6d !important;
  color: #6d6d6d !important;

`
export const SubmitButton: any  = styled(Button)`
  border-radius:24px;
  margin: 30px 0 15px;
  `
  export const UserMedia = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  h3{
      margin:0;
  }
  .ant-upload{
      border:none;
  }
  .ant-upload > div > img {
      display:none;
  }
  .ant-upload-picture-card-wrapper {
      justify-content: left;
  }
  .ant-upload.ant-upload-select-picture-card > .ant-upload {
    height: auto;
    width:auto;
    border-radius: 24px;
  }
  .ant-upload.ant-upload-select-picture-card > .ant-upload > div{
    padding:9px 24px;
   }
  .ant-upload.ant-upload-select-picture-card {
      height: auto;
      width:auto;
      margin: 0;
      border-radius: 24px;
  }

`

export const MediaInfo = styled.p`
    color: #6d6d6d;
    font-size: 14px;
`

export const UserLogo = styled.div`
    background:#000;
    border-radius: 24px;
    padding: 25px;
`
export const UserProfilePic = styled.div`
    background:#000;
    border-radius: 24px;
    padding: 25px;
`
export const UserSocialMedia = styled.div`
    background:#000;
    border-radius: 24px;
    padding: 25px 35px;
    margin: 20px 0;
`

export const UserDeleteAccount = styled.div`
    background:#000;
    border-radius: 24px;
    padding:  25px 35px;
    h3 {
        margin:0;
    }
`

export const DeleteWarning = styled.p`
    color: #6d6d6d;
    font-size: 14px;
`
export const DeleteBtn = styled.button`
    color: #FF0000;
    font-size: 14px;
    background:transparent;
    border:none;
    cursor: pointer;
`