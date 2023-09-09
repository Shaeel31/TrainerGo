// @flow
import * as React from 'react'
import { Color, ColorsContainer, ColorsSection } from './styled'
import Paragraph from 'antd/lib/typography/Paragraph'
import { Radio } from 'antd'
import { memo } from 'react'

type Props = {
  colors?: any
  onChange?: any
  value?: any
  id?: any
}
const Colors = (props: Props) => {
  const { id, colors, value, onChange } = props
  return (
    <ColorsContainer>
      <Paragraph>color</Paragraph>
      <Radio.Group onChange={onChange} value={value}>
        <ColorsSection>
          {colors &&
            colors.map((_color, idx) => (
              <Color
                key={idx}
                id={`${id}-${idx}`}
                color={_color.color}
                value={_color.id}
              />
            ))}
        </ColorsSection>
      </Radio.Group>
      {/*<SelectColor color={colors}/>*/}
    </ColorsContainer>
  )
}
export default memo(Colors)
//
// const SelectColor = ({ color }) => {
//   // const [check, setCheck] = useState(false)
//   const [value, setValue] = React.useState(1)
//
//   const onChange = (e) => {
//     // console.log('radio checked', e.target.value)
//     setValue(e.target.value)
//   }
//   // const handleCheck = () => {
//   //   setCheck(!check)
//   // }
//   return (
//     <Radio.Group onChange={onChange} value={value}>
//       {color.map((_color, idx) => (
//         <Color key={idx} color={_color.color} value={_color.id}/>
//       ))}
//     </Radio.Group>
//   )
// }
