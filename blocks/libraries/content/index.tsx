import * as React from 'react'
import _ from 'lodash'
import { LibCard } from '../../../components/libCard'
import { CardContainer, PanelContent } from './styled'

type Props = {
  data: any
  isDropped: any
  onDoubleClick?: any
}
export const Panel = (props: Props) => {
  const { data, isDropped, onDoubleClick } = props

  return (
    <PanelContent gutter={[12, 12]}>
      {_.isEmpty(data) ? (
        <p style={{ width: '100%', height: '100px', textAlign: 'center' }}>
          No Data Found
        </p>
      ) : (
        data.map((item: any, index) => {
          if (item?.accepts === 'exercise')
            return (
              <CardContainer
                onDoubleClick={() => onDoubleClick(item)}
                key={index}
                sm={12}
                md={12}
                lg={12}
                xl={8}
              >
                <LibCard
                  name={item.title ? item.title : item.mainTitle}
                  item={item}
                  type={item.accepts}
                  isDropped={isDropped(item)}
                  key={index}
                />
              </CardContainer>
            )
          return (
            <CardContainer
              onDoubleClick={() => onDoubleClick(item)}
              key={index}
              sm={12}
              md={12}
              lg={12}
              xl={8}
            >
              <LibCard
                name={item.title ? item.title : item.mainTitle}
                item={item}
                type={item.accepts}
                isDropped={isDropped(item)}
                key={index}
              />
            </CardContainer>
          )
        })
      )}
    </PanelContent>
  )
}
