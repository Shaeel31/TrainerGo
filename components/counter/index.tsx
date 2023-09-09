// @flow
import * as React from 'react'
import { useState } from 'react'
import { CounterContainer } from './styled'
import Button from 'antd/lib/button/button'
import { Input } from '../input'
import { MinusOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons/lib'
import { memo } from 'react'

const Counter = ({ rounds, max, onChange, ...rest }: any) => {
  const [state, setState] = useState(rounds ? rounds : 0)

  const increment = () => {
    if (state < max) {
      setState(state + 1)
      onChange && onChange(state + 1)
    }
  }
  const decrement = () => {
    if (state > 0) {
      setState(state - 1)
      onChange && onChange(state - 1)
    }
  }
  return (
    <CounterContainer className="counter" {...rest}>
      <Button
        className="decrement"
        onClick={decrement}
        icon={<MinusOutlined />}
      />
      <Input
        style={{ border: 'none', maxWidth: 20 }}
        value={state}
        readOnly={true}
      />
      <Button onClick={increment} icon={<PlusOutlined />} />
    </CounterContainer>
  )
}
export default memo(Counter)
