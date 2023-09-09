import styled from 'styled-components'
import { Button } from 'antd'

export const CockpitScreenContainer: any = styled.div`
  background: #000;
`
export const ScreenContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 25px;
  align-items: center;
  min-height: 100vh;
  padding:60px 0;
`
export const ScreenTitle = styled.h2`
  color: #fff;
  font-size: 32px;
  text-align: center;
`
export const ScreenContent = styled.div`
  max-width:420px;
  margin: 0 auto;
`

export const ScreensBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`
export const ScreensButtons = styled.div`
  margin:30px 0 0;
  .ant-btn {
     margin: 40px auto 0;
     display: block;
  }
  .ant-btn-primary {
    width: 100%;
    margin: 0 0 10px;
  }
`
export const ScreenView: any = styled.div`
  min-height: 208px;
  padding: 24px;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 20px 1fr 20px;
  gap: 15px;
  align-items: center;
  background-color: ${(props: any) =>
    props.background ? props.background : '#1c1c1e'};
  .ant-typography {
    text-align: center;
    font-weight: bold;
    color: #767676;
  }
  .qr-code {
    width: 100px !important;
    margin: 0 auto;
    height: 90px !important;
  }
`
export const GeneratedCode = styled.span`
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  font-size:42px;
`
export const NavigateTo = styled.span`
  text-align: center;
  font-weight: 600;
  font-size:12px;
  a {
    margin: 0 0 0 5px;
  }
`

export const Picture: any = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-image: ${(props: any) => (props.src ? `url(${props.src})` : '')};
  background-repeat: no-repeat;
`

export const SaveButton: any = styled(Button)`
  border-radius: 24px;
  border:none;
  color:#3cff8f;
  &.ant-btn-primary {
      color: #000;
  }
`