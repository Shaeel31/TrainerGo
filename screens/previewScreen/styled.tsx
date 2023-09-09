import styled from 'styled-components'
import { Button, Modal } from 'antd'

export const PreviewContainer = styled.div`
  background-color: #ffffff !important;
`
export const HeaderTop = styled.div`
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width:840px;
  margin:0 auto;
`
export const TopButton = styled(Button)`
  //background-color: #13be05 !important;
  width: auto !important;
  height: auto !important;
  font-size: 0.7em !important;
`
export const WorkoutDetails = styled.div`
  //background-color: #13be05 !important;
  max-width: 600px;
  margin: 0 auto;

  section:not(:last-of-type) {
    margin-bottom: 6px;
  }
`
export const BlockRestSection = styled.section`
  height: 40px;
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  border: solid 0.5px #dadada;

  * {
    margin: 0;
  }

  margin-bottom: 6px;
`
export const BlockSection = styled.section`
  height: auto;
  padding: 2px 5.5px 5.5px 5.5px;
  border-radius: 8.5px;
  border: solid 0.5px #dadada;
  margin-bottom: 6px;
`
export const BlockTitle = styled.div`
  font-size: 1em;
  font-weight: bold;
  line-height: 2.25;
  letter-spacing: normal;
  color: #121214;
`

export const Preview: any = styled(Modal)`
  margin: 0;
  height: 100%;
  width: 100% !important;
  padding: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;

  .ant-modal-header {
    background-color: #ffffff !important;
    border-bottom: none;
  }

  .ant-modal-wrap {
    top: -10px;
  }

  .ant-modal-content {
    background-color: #ffffff !important;
    height: 100vh;
    overflow: hidden;
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
  }

  .ant-modal-body {
    //background-color: #d4aeae !important;
    height: 100%;
    max-height: calc(100% - 57.52px);
    padding: 12px 0;
    overflow: auto;
  }

  .ant-btn {
    border: none;
    color: #3cff8f;
    width: 140px;
    border-radius: 100px;
  }

  .ant-btn-primary {
    color: #1c1c1e;
  }
`

export const VideoInstructions = styled.div`
  section:not(:last-of-type) {
    margin-bottom: 6px;
  }
`
