import styled from 'styled-components'
import { Checkbox } from 'antd'

export const ExerciseContainer = styled.div``
export const ExerContainer = styled(Checkbox.Group)`
  .ant-checkbox-inner {
    background-image: url('/icons/tick.svg');
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    height: 50px;
    width: 50px;
    position: relative;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border: none;
    background-image: none !important;
  }
  .ant-checkbox-checked {
    border: none;
    background-image: none !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    position: absolute;
    border: none !important;
    top: 0 !important;
    left: 8px !important;
    height: 40px;
    width: 40px;
    display: table;
    //-webkit-transform: rotate(45deg) scale(1) translate(-50%, -50%);
    transform: rotate(0) scale(2) translate(17%, 23%);
    opacity: 1;
    -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    content: url('/icons/active-tick.svg') !important;
  }

  // .ant-radio-inner {
  //   height: 100%;
  //   background-color: red !important;
  //   width: 100%;
  //   //background-color: ${(props: any) =>
    props.color ? props.color : 'transparent'};
  //   padding: 0;
  //
  //   border-color: black !important;
  //
  //   :after {
  //     box-shadow: 0 0 0 2pt #343434;
  //     border-radius: 100%;
  //     top: -1px;
  //     left: -1px;
  //     background-color: transparent;
  //     background-image: url('/icons/active-tick.svg');
  //     background-position: center;
  //     background-size: auto;
  //     background-repeat: no-repeat;
  //     height: 30px;
  //     width: 30px;
  //   }
  // }
`
