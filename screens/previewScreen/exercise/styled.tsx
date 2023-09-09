import styled from 'styled-components'

export const PrevContainer = styled.div`
  section:not(:last-of-type) {
    margin-bottom: 6px;
  }
`
export const PreviewExContainer = styled.section`
  padding: 3.5px 13.5px 3px 3px;
  border-radius: 4px;
  background-color: #f8f8f8;
  display: grid;
  grid-template-columns: 3fr 1fr 80px;
  align-items: center;
  gap: 8px;

  div {
    text-align: center;
  }
`
export const MainTitle = styled.div`
  //background: #6d6d6d;
`
export const RepsContainer = styled.div`
  b {
    color: #1c1c1e;
  }

  :before {
    width: 40px;
    text-align: right;
    font-size: 0.8em;
    content: 'reps:';
  }
`
export const TimeBox = styled.div`
  //background: #6d6d6d;
  b {
    color: #1c1c1e;
  }
`
export const SubDetail: any = styled.div`
  display: flex;
  align-items: center;

  h4.ant-typography {
    margin: 0;
    font-weight: 600;
  }

  ${(props: any) => `
    :before{
    width:40px;
    text-align:right;
 font-size:.8em;
      content: '${props?.content}'
    }
  `}
`
export const ExRestContainer = styled.section`
  padding: 10px 12px;
  border-radius: 4px;
  background-color: #f8f8f8;
  display: grid;
  grid-template-columns: 3fr 1fr 80px;
  align-items: center;
  gap: 8px;

  div {
    text-align: center;
  }

  h4.ant-typography {
    margin: 0;
    font-weight: 600;
    padding-left: 24px;
    color: #1c1c1e;
  }
`
