import styled from 'styled-components'
import { Radio } from 'antd'

export const ColorsContainer = styled.div`
  padding: 8px 0;
  max-width: 135px;
  .ant-typography {
    margin-bottom: 8px;
  }
`
// background-color: ${(props: any) => (props.color ? props.color : 'green')};
// background-image: ${(props: any) =>
//   props.tick ? `url('/icons/color-tick.svg')` : ''};
// box-shadow: ${(props: any) => (props.tick ? `0 0 0 3pt #343434` : '')};
export const Color: any = styled(Radio)`
  //display: flex !important;
  //align-items: center !important;
  //justify-content: center !important;
  .ant-radio-inner {
    height: 30px;
    width: 30px;
    background-color: ${(props: any) => (props.color ? props.color : 'red')};
    padding: 0;

    border-color: black !important;

    :after {
      box-shadow: 0 0 0 2pt #343434;
      border-radius: 100%;
      top: -1px;
      left: -1px;
      background-color: transparent;
      background-image: url('/icons/color-tick.svg');
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
      height: 30px;
      width: 30px;
    }
  }

  // width: 25px;
  // height: 25px;
  // border-radius: 100%;
  // cursor: pointer;

  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: 14px;
`

export const ColorsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`
