import styled from 'styled-components'
import { Modal } from 'antd'

export const ModalContainer = styled(Modal)`
  background-color: #000000;
  height: 100%;
  width: 100% !important;
  padding: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  overflow: scroll;

  .ant-modal-footer {
    margin-top: 8%;
    border-top: none;
  }

  .ant-modal-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-btn {
    border: none;
    color: #3cff8f;
    width: 140px;
    border-radius: 100px;
  }

  .ant-btn-primary {
    color: #1c1c1e;
  }
`
