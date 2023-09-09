import styled from 'styled-components'
import { Layout } from 'antd'
const { Sider, Content } = Layout

export const AuthContainer = styled(Layout)`
  height: 100vh;
`
export const AuthSider = styled(Sider)`
  flex: 0 0 50% !important;
  max-width: 50% !important;
  background-image: url('/background-register.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .ant-layout-sider-children {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    max-width: 250px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
export const AuthContent = styled(Content)`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
`
export const FormContainer = styled.div`
  min-width: 370px;
  max-width: 400px;
  width: 100%;
  height: auto;
  @media (max-width: 768px) {
    min-width: 80%;
  }
`
export const TextGroup = styled.div`
  margin-bottom: 50px;
  text-align: center;
  h1.ant-typography {
    color: #ffffff;
    font-size: 25px;
    font-weight: 600;
  }
  div.ant-typography {
    font-size: 18px;
  }
`
