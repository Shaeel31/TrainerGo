import styled from 'styled-components'

export const WorkoutSettingContainer = styled.div`
  height: 100vh;
`

export const SectionRow = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
  max-width: 1336px;
  gap: 24px;
  grid-template-columns: 1fr 1fr 2fr 1fr;
`

export const SectionCol: any = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 24px;
`
export const Thumbnail = styled.div`
  height: 110px;
  margin: 8px -12px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
`
//
//
// export const SectionRow = styled(Row)`
// `
//
// export const SectionCol = styled(Col)`
//
// `
