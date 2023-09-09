import styled from 'styled-components'

export const LayoutContainer: any = styled.main`
  max-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: #1c1c1e;
  overflow: hidden;
  height: ${(props: any) => (props.height ? `${props.height}px` : '700px')};
`
