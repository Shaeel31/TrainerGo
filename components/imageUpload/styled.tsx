import styled from 'styled-components'
import { Upload } from 'antd'

export const ImageUploadContainer = styled.div`
  position:relative;
`
export const ImageUploadBox = styled(Upload)`
  display: flex;
  justify-content: center;
  position:relative;

  .ant-upload {
    width: 100%;
    border-radius: 10px;
    background: rgba(53, 167, 59, 0.1);
  }
`
export const ImageUploadCancel = styled.div`
   position: absolute;
   top:0;
   left:0;
   padding:5px;
   z-index:4;
   cursor:pointer;
   transform: translate(-50%, -50%);
   color:#3cff8f;
`


