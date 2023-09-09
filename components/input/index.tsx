import * as React from 'react'
import { CustomInput } from './styled'

type Props = {
  placeholder?: string
  className?: any
  label?: any
  id?: any
  value?: any
  onChange?: any
}
export const Input: any = (props: Props) => {
  return <CustomInput {...props} />
}
