import styled from 'styled-components'
import { Modal } from 'antd'

export const ConfirmModal = styled(Modal)`
  .ant-modal-content {
    width: 400px;
    max-width: 500px;
    border-radius: 10px;
    background-color: #121214;
    padding: 24px 0;
  }

  .ant-modal-header {
    border: none;
    background: transparent;
  }

  .ant-modal-body {
    text-align: center;
  }

  .ant-modal-footer {
    border: none;
    text-align: center;

    button {
      border-radius: 100px;
      min-width: 100px;
    }
  }
`
