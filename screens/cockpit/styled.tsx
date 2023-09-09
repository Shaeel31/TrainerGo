import styled from 'styled-components'
import { Progress, Button } from 'antd'
import { ModalContainer } from '../../blocks/ModelFullView/styled'

export const MockContainer = styled.div`
  background:#434343b3;
  height: 100vh;
  position: relative;
`

export const VideoContainer = styled.div`
  height: 100vh;
  width:100vw;
  .video{
    width:100%;
    height:100%;
    object-fit: cover;
  }
`
export const TimeLeft: any = styled.div`
  position: absolute;
  background: #000;
  left: ${(props: any) => props?.left}%;
  top: 0;
  transform: translate(-50%, -13%);
  padding: 0 15px;
  border-radius: 24px;
  z-index: 2;
  color:#6D6D6D;
  font-size: 14px;
  line-height: 1.6;
  strong {
    color:#fff;
    font-size: 16px;
  }
`

export const LogoContainer = styled.div`
  position: absolute;
  left: 5%;
  top: 5%;
  width:200px;
  img{
    width:100%;
    height:auto;
    object-fit:cover;
  }
`
export const TimeContainer = styled.div`
  position: absolute;
  right: 5%;
  top: 5%;
  // background-color:#00000042;
  // border-radius: 30px;
  // padding:5px;
  .ant-progress-circle {
    .ant-progress-inner {
       width:140px !important;
       height: 65px !important;
    }
  }
  svg {
    height: 120px;
    width:200px;
    stroke: #fff;
    fill:#00000042;
    stroke-width: 25;
    stroke-linecap:round;
    transition: all 0.3s;
    rect {
      width: 150%;
      height: 85%;
    }
  }
`
export const PlayLineContainer = styled.div`
  position: absolute;
  right: 5%;
  left: 5%;
  bottom: 5%;
  .ant-progress-outer{
    padding:0;
  }
`

export const ExerciseTime = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color:#fff;
  font-size: 45px;
  font-weight: 600;
`

export const ExerciseDetailContainer = styled.div`
  position: absolute;
  left: 5%;
  bottom: 5%;
`
export const ExerciseMod: any = styled.div`
  position: absolute;
  right: 5%;
  bottom: 10%;
  background-color:#00000042;
  padding: 5px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: ${(props: any) => props?.isExpand ? "460px": "150px 340px"};
  @media screen and (max-width:1440px) {
    grid-template-columns: ${(props: any) => props?.isExpand ? "360px": "100px 240px"};
  }
`
export const ModImage: any = styled.div`
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`
export const ModWrap: any = styled.div`
  padding:7px;
  h4.ant-typography {
    color: #ffffff;
    margin-bottom: 0;
    font-size: 30px;
    font-weight: normal;
    @media screen and (max-width:1440px) {
      font-size: 18px;
    }
  }

  h2.ant-typography {
    color: #ffffff;
    margin-bottom: 0;
    font-weight: 600;
    font-size: 85px;
    line-height: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media screen and (max-width:1440px) {
      font-size: 52px;
    }
  }
`

export const ExerciseWrap = styled.div`
  background-color:#00000042;
  margin:0 0 30px;
  padding: 10px;
  border-radius: 8px;
  width:max-content;
  h4.ant-typography {
    color: #ffffff;
    margin-bottom: 0;
    font-size: 30px;
    font-weight: normal;
    @media screen and (max-width:1440px) {
      font-size: 18px;
    }
  }

  h2.ant-typography {
    color: #ffffff;
    margin-bottom: 0;
    font-weight: 600;
    font-size:85px;
    line-height: 1;
    @media screen and (max-width:1440px) {
      font-size: 52px;
    }
  }
`

export const PlayBar: any = styled(Progress)`
  .ant-progress-bg {
    background: #1c1c1e;
    position: relative;
    z-index: 1;
    margin:3px;
  }
`

export const CameraPopUp: any = styled(ModalContainer)`
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

export const CameraBtn: any  = styled(Button)`
     border-radius: 24px;
      margin: 0 10px 30px 0;
`

export const CameraTitle = styled.h2`
     font-size:24px;
     margin:0 0 30px;
`