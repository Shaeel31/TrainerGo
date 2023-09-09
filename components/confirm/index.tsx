// @flow
import React from 'react'
import { ConfirmModal } from './styled'

type Props = {
  title?: any
  visible?: boolean
  onConfirm?: any
  text?: any
  onCancel?: any
  okText?: any
  cancelText?: any
}
export const Confirm = (props: Props) => {
  const { title, text, visible, okText, cancelText, onCancel, onConfirm } =
    props

  return (
    <ConfirmModal
      title={title}
      visible={visible}
      centered
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText ? okText : 'Save as new'}
      cancelText={cancelText ? cancelText : 'Overwrite'}
    >
      {text}
    </ConfirmModal>
  )
}
