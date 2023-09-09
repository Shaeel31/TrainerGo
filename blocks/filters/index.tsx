import React, { memo } from 'react'
import { CustomDrawer, FilterHeader, FilterItem, FilterList } from './styled'
import Title from 'antd/lib/typography/Title'
import Button from '../../components/button'
import Paragraph from 'antd/lib/typography/Paragraph'

const filters = require('./filters.json')
type Props = {
  children?: any
  visible?: any
  filterItems?: any
  onClose?: any
  onChange?: any
  onClear?: any
}

const Filters: any = (props: Props) => {
  const { children, visible, filterItems, onChange, onClear, onClose } = props

  const _header = (
    <FilterHeader>
      <Title level={3}>FILTERS</Title>
      <Button type="primary" size="small" shape="round" onClick={onClear}>
        Clear all
      </Button>
    </FilterHeader>
  )

  return (
    <div>
      {children}
      <CustomDrawer
        title={_header}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <FilterList>
          <Paragraph>{filters.bodyweight.title}</Paragraph>
          <FilterItem
            options={filters.bodyweight.filters}
            value={filterItems.bodyWeightId}
            onChange={(e) => onChange('bodyWeightId', e)}
          />
        </FilterList>

        <FilterList>
          <Paragraph>{filters.suspensionTrainers.title}</Paragraph>

          <FilterItem
            options={filters.suspensionTrainers.filters}
            value={filterItems.suspensionTrainerId}
            onChange={(e) => onChange('suspensionTrainerId', e)}
          />
        </FilterList>

        <FilterList>
          <Paragraph>{filters.ResistanceBands.title}</Paragraph>
          <FilterItem
            options={filters.ResistanceBands.filters}
            value={filterItems.resistanceBandId}
            onChange={(e) => onChange('resistanceBandId', e)}
          />
        </FilterList>
      </CustomDrawer>
    </div>
  )
}
export default memo(Filters)
