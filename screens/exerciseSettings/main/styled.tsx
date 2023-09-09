import styled from 'styled-components'
import { Button } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import { ModalContainer } from './../../../blocks/ModelFullView/styled'


export const MainContainer = styled.div`
  background-color: #1c1c1e;
  border-radius: 10px;
  height: 100%;
  display: grid;
  grid-template-rows: 140px 1fr;
`
export const MainEditBox = styled.div`
  .ant-typography {
    margin: 0;
  }
`
export const MainHeader = styled.div`
    // height:100%;
`
export const PlayerContainer = styled.div`
  display: flex;
  height: 100%;
`
export const PlayerBox = styled.div`
  width: 100%;
  height:100%;
  display: grid;
  grid-auto-rows: 1fr auto;
  .player{
    align-self: flex-end;
  }
`

export const VideoPlayer = styled(ModalContainer)`
  background: transparent;
  .ant-modal-content {
    background: #00000094;
    .ant-modal-body {
      height: 330px;
      max-width: 540px;
      width: 100%;
    }
    .ant-modal-footer {
      margin:20px 0 0;
    }
  }
`
export const VideoThumbnail = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  display:flex;
  align-self: flex-end;
  cursor:pointer;
  :after {
    content: url('/icons/play.svg');
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    height: 100% !important;
    width: 100% !important;
    object-fit:cover;
  }
`

export const DropText = styled.div`
  align-self: center;
  display: block;
  justify-self: center;
`

export const PlayerWindow = styled.div`
padding: 8px 0;
margin: 8px -14px !important;
width: calc(100% + 28px) !important;
border-radius: 15px;
overflow: hidden;
border: 1px dashed #ddd;
display: inline-grid;
height: 240px;
align-self: end;
  img {
    height: 300px;
    width: 100%;
  }
  .ant-btn-round.ant-btn-sm {
    margin: 0 5px 10px auto;
    width: 80px;
    display: block;
    color: #66ffa3;
    &:hover, 
    &:focus {
        color: #000;
    }
  } 
`
export const PLayerLinks = styled.div``

export const EditBox: any = styled(ModalContainer)`
  color: #fff;
  background: transparent;
  .ant-modal-content {
    .ant-modal-body {
      .ql-container {
        height:180px;
      }
    }
    .ant-modal-footer {
      margin:15px 0 0;
    }
  }
`

export const InstructionText: any = styled.div`
  color: #fff;
  .para {
    display: -webkit-box;
    max-width: 100%;
    margin: 0 auto;
    -webkit-line-clamp: 2;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    overflow: hidden;
    text-overflow: ellipsis;
    p {
      margin:0;
    }
  }
  ul,ol {
    margin:0;
  }
  .anticon {
    margin:0 0 0 7px;
  }
`

export const EditCustom: any = styled(Paragraph)`
   height:38px;
  ${(props: any) => `
  
    :after {
    content: '${props?.content ? props?.content : ''}' ;
    display:flex;
    margin-left: 6px;
    color:#434343 !important;
    width:100%;
    font-size:18px;
    position: absolute;
    bottom:-3px;
    left:50px;
  }

  `}
  line-break: anywhere;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 !important;
  margin: 0 !important;
  color: #ffffff !important;

  .anticon-edit {
    font-size: 10px;
  }

  .ant-input {
    color: #ffffff !important;
    //height: auto;
    //width: auto;
  }

  font-size: ${(props: any) => (props.font ? props.font + 'px' : '12px')};
`

