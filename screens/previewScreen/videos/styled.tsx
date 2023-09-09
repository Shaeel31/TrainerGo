import styled from 'styled-components'
import { ModalContainer } from '../../../blocks/ModelFullView/styled'


export const VideosWrapper = styled.div`
  padding: 50px 25px;
  background-color: #f8f8f8;
`

export const VideosContainer = styled.div`
  max-width: 900px;
  margin:0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

export const VideoSection = styled.div`

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
  width: 170px;
  height: 130px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  .icon {
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 55px;
    height: 55px;
    cursor:pointer;
    pointer-events: none;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit:cover;
    cursor:pointer;
  }
`
export const VideoTitle: any = styled.div`
  padding: 8px 0;
  font-size:18px;
  b {
    color: #121214;
    font-size: 28px;
  }

  ${(props: any) => `
    :before{
    width:40px;
    text-align:right;
      font-size:.8em;
      content: '${props?.content}:';
      margin-right: 6px;
    }
  `}
`

export const VideoDesc = styled.div`
  max-width: 400px;
  ol,ul,li,p {
    color: #121214;
    font-size:18px;
  }
`
