import styled from 'styled-components'
import { Button } from 'antd'

export const BtnContainer = styled.div`
  position: absolute;
  height: auto;
  width: 200px;
  bottom: 10px;
  left: 40%;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1336px) {
    left: 20%;
  }
`
export const BtnHoverTop = styled.div`
  background: black;
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 8px;
  border-radius: 100px;
`
export const BtnBottom = styled.div`
  background: black;
  padding: 0 6px 4px 6px;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  position: relative;
  height: auto;

  :after {
    position: absolute;
    height: 20px;
    width: 20px;
    content: url(/right.svg);
    right: -20px;
    top: 0px;
  }

  :before {
    position: absolute;
    height: 20px;
    width: 20px;
    content: url(/left.svg);
    left: -20px;
    top: 0px;
  }
`
export const AddBtn = styled(Button)`
  background: #343434;
  border: none;
`
export const RestBtn = styled(Button)`
  background: rgba(53, 167, 59, 0.1);
  border: none;
  color: seagreen;
  font-size: 0.7em !important;
  .anticon {
    z-index: 100;
  }
`
export const BlockBtn = styled(Button)`
  background: rgba(53, 167, 59, 0.1);
  border: none;
  color: seagreen;
  font-size: 0.7em !important;
`
