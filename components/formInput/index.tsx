// @flow
import * as React from 'react'
import { CustomInput, CustomItem } from './style'
import { FC } from 'react'

export const FormInput: FC<any> = (props) => {
  return (
    <CustomItem {...props}>
      <CustomInput type={props?.type} />
    </CustomItem>
  )
}
