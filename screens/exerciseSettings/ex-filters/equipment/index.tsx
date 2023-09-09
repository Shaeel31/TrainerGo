import * as React from 'react'
import { EquipmentBox, EquipmentGroup, EquipmentItem } from './styled'
import Title from 'antd/lib/typography/Title'

// const filters = require('../../exercise.json').data.filters
type Props = {
  title?: any
  onChange?: any
  filters?: any
  value?: any
  id?: any
  padding?: any
}
export const Equipment = (props: Props) => {
  const { id, title, filters, padding, onChange, value } = props

  // const [state, setState] = useState<{
  //   value: number,
  // }>({
  //   value: 1
  // })
  // const onChange = e => {
  //   console.log('radio checked', e.target.value)
  //   setState({
  //     value: e.target.value
  //   })
  // }
  return (
    <EquipmentBox>
      {/*<Title level={3}>{title}</Title>*/}
      <Title level={3}>{title}</Title>
      <EquipmentGroup value={value}>
        {filters.map((item, idx) => (
          <EquipmentItem
            key={idx}
            id={`${id}-${idx}`}
            value={item.id}
            onChange={onChange}
            padding={padding}
          >
            {item.title}
          </EquipmentItem>
        ))}
      </EquipmentGroup>
    </EquipmentBox>
  )
}