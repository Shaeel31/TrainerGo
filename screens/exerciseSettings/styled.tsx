import styled from 'styled-components'
import { ModalContainer } from '../../blocks/ModelFullView/styled'
import { Button } from 'antd'

export const ExerciseSettingContainer: any = styled(ModalContainer)`
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-body {
    width:100%;
    padding: 0 10px;
  }
`

export const DeleteExerciseBtn = styled(Button)`
  color: #ff0000 !important;
`
export const CancelBtn = styled(Button)`
  margin:0 0 0 auto;
  display:block;
`

export const SaveBtn = styled(Button)`
  margin:0 0 0 15px;
`

export const ModalFooter = styled.div`
  padding:10px 8px;
  display:flex;
`

export const SettingGrid: any = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px 1fr;
  gap: 8px;
  @media screen and (max-width:1440px) {
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
  }
`
export const SettingBox: any = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`
export const SettingBoxInnerHeader: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-typography {
    margin: 0;
  }
`
export const SettingBoxInner: any = styled.div`
  max-height: calc(100vh - 120px);
  border-radius: 10px;
  background-color: #1c1c1e;
  padding:15px;
`
export const Box: any = styled.div`
  background-color: #000;
  margin: -15px;
  height: calc(100% - 84px);
  width: auto;
`
export const TopFilters: any = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  .ant-select {
    width:100%;
  }
`
export const AddTime: any = styled.div`
  border-radius: 10px;
  background-color: #1c1c1e;
  padding:15px;
`

