import * as React from 'react'
import { ExContainer, ExContent, ExHeader, ClearBtn } from './styled'
import Title from 'antd/lib/typography/Title'
import { Equipment } from './equipment'
import { memo } from 'react'
import Button from '../../../components/button'


const filters = require('./../exercise.json').data.filters
type Props = {
  onChange?: any
  meta?: any
  onRemoveAll?:any
}

const ExFilters = (props: Props) => {
  const { onChange, meta, onRemoveAll } = props
  return (
    <ExContainer>
      <ExHeader>
        <Title>Equipment</Title>
        <Button type="primary" onClick={() => { 
          onRemoveAll({
            bodyWeightId : "",
            resistanceBandId: "",
            suspensionTrainerId: "",
          })
        }} size="small" shape="round">Remove All</Button>
      </ExHeader>
      <ExContent>
        <Equipment
          title="body weight"
          id="bodyWeightId"
          value={meta?.bodyWeightId}
          onChange={onChange}
          filters={filters.bodyweight?.filters}
        />
        <Equipment
          title="Resistance bands"
          id="resistanceBandId"
          value={meta?.resistanceBandId}
          padding="0 0 0 10px"
          onChange={onChange}
          filters={filters.ResistanceBands?.filters}
        />
        <Equipment
          title="suspension trainers (TRX)"
          id="suspensionTrainerId"
          value={meta?.suspensionTrainerId}
          onChange={onChange}
          filters={filters.suspensionTrainers?.filters}
        />
      </ExContent>
    </ExContainer>
  )
}
export default memo(ExFilters)