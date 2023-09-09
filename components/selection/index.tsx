// @flow
import * as React from 'react'
import { OptionControl, SelectionControl } from './styled'

type Props = {
  style?: any
}
export const Selection = (props: Props) => {
  function handleChange() {
    // console.log(`selected ${value}`)
  }

  return (
    <SelectionControl
      suffixIcon={<img src="arrow.svg" alt="arrow" />}
      defaultValue="all"
      style={{ width: 120 }}
      onChange={handleChange}
      {...props}
    >
      <OptionControl value="all">All</OptionControl>
      <OptionControl value="some">custom</OptionControl>
      <OptionControl value="few">TrainerGo</OptionControl>
    </SelectionControl>
  )
}
