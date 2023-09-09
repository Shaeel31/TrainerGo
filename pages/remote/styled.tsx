import styled from 'styled-components'
import { Button } from 'antd'


export const Container = styled.div`
  max-width: 1280px;
  margin:0 auto;
  padding: 0 25px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const Logo = styled.div`
    max-width: 200px;
    padding: 60px 0;
    margin: 0 auto;
    img {
        width: 100%;
    }
`

export const CodeTitle = styled.div`
    text-align: center;
    font-weight: 600;
    font-size:18px;
    color: #767676;
`
export const CodeInput = styled.div`
    text-align: center;
    margin: 40px 0;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #767676 !important;
        border-radius: 0px !important; 
        color: #767676 !important;
        font-family: inherit !important;
    }

`

export const StartButton = styled(Button)`
  padding: 0 45px;
  border-radius: 24px;
  margin:0 auto 60px;
  display:block;
`

