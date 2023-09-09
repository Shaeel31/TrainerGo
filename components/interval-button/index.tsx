// @flow
import * as React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ButtonContainer } from './styled'
import { memo } from 'react'

type Props = {
  text: any
  onClick?: any
}
const Interval = (props: Props) => {
  return (
    <ButtonContainer>
      <Button
        shape="round"
        type="primary"
        icon={<PlusOutlined />}
        loading={false}
        {...props}
      >
        {props.text}
      </Button>
    </ButtonContainer>
  )
}
export default memo(Interval)
