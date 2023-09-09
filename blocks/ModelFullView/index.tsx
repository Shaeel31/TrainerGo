// @flow
import * as React from 'react'
import { ModalContainer } from './styled'
import { memo } from 'react'

type Props = {
  children?: any
  onChange?: any
  visible?: boolean
  onOk?: any
}
const FullModal = (props: Props) => {
  const { children, visible, onChange, onOk } = props

  return (
    <ModalContainer
      visible={visible}
      okText="Save"
      cancelText="cancel"
      onOk={onOk}
      onCancel={onChange}
    >
      {children}
    </ModalContainer>
  )
}
export default memo(FullModal)
