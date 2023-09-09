// @flow
import * as React from 'react'
import { FC, ReactNode } from 'react'
import { SubmitButton } from './style'

type Props = {
  disabled?: boolean
  loading?: boolean
  children?: ReactNode | any
}

export const Submit: FC<Props | any> = (props) => {
  const { children, loading, disabled } = props
  return (
    <SubmitButton
      type="primary"
      htmlType="submit"
      size="large"
      shape="round"
      loading={loading}
      disabled={disabled}
    >
      {children}
    </SubmitButton>
  )
}
