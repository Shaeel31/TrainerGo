// @flow
import React, { memo } from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

const Loading = () => {
  return (
    <LoadingContainer>
      <Spin tip="Loading..." />
    </LoadingContainer>
  )
}
export default memo(Loading)
const LoadingContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
