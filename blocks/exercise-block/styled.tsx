import styled from 'styled-components'
import { Button, Checkbox, Collapse } from 'antd'

const { Panel } = Collapse

export const ExerciseContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 12px;

  :not(:last-of-type) {
    margin-bottom: 4px;
  }
`
export const ExerciseInner = styled.div`
  display: grid;
  grid-template-columns: 40px minmax(130px,auto) minmax(70px,auto) auto auto 30px;
  padding: 8px;
  gap: 12px;
  border-radius: 10px;
  align-items: center;
  background-color: #1c1c1e;

  :not(:last-of-type) {
    margin-bottom: 4px;
  }
`
// background-repeat: no-repeat;
// height: 100%;
// width: 90%;
// display: flex;
// align-items: center;
// justify-content: center;
// background-size: contain;
// background-position: center;
// background-origin: border-box;
// cursor: pointer;
// background-image: ${(props: any) =>
//   props.tick ? `url(${props.tick})` : null};

export const CheckSection: any = styled(Checkbox)`
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
`

// background-repeat: no-repeat;
// height: 100%;
// width: 90%;
// display: flex;
// align-items: center;
// justify-content: center;
// background-size: contain;
// background-position: center;
// background-origin: border-box;
// cursor: pointer;
// background-image: ${(props: any) =>
//   props.icon ? `url(${props.icon})` : null};
export const GroupSection: any = styled.div`
  background: #000000;
  cursor: pointer;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 90%;
  }
`

export const TitleSection = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
`

export const GroupTitleSection = styled.div`
  .ant-typography {
    margin: 0;
    color: #ffffff;
  }
`

export const RepsSection = styled.div``
export const TimeSection = styled.div`
  .ant-picker {
    width: 100% !important;
    min-width: 60px;

    input {
      color: #ffffff !important;
    }
  }
`
export const ActionsSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end !important;

  button {
    border: none;
  }
`
export const SectionButton: any = styled(Button)``
export const MenuSection = styled.div`
  button {
    border: none;
  }
`

export const SubTitle = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  align-items: flex-end;

  .ant-typography {
    margin: 0 -80px 0 4px;
    overflow:auto;
    color: #ffffff;
    white-space: nowrap;
  }

  label {
    text-align: right;
  }
`

export const Duration = styled.div`
  margin-left: 15px;
`

export const GroupExerciseContainer = styled(Collapse)`
  //background-color: #1c1c1e;
  display: grid;
  //grid-template-columns: 50px auto 60px 60px auto 30px;
  //padding: 8px;
  //gap: 12px;
  //border-radius: 10px;
  //align-items: center;
  //
  //:not(:last-of-type) {
  //  margin-bottom: 4px;
  //}
  .ant-collapse-arrow {
    display: none !important;
  }
`
export const GroupExercisePanel = styled(Panel)`
  display: grid;

  //grid-template-columns: 50px auto 60px 60px auto 30px;
  //padding: 8px;
  //gap: 12px;
  //border-radius: 10px;
  //align-items: center;
  .ant-collapse-header {
    //background-color: #1c1c1e;
    padding: 0 !important;
  }

  .ant-collapse-content-box {
    padding: 4px 0 1px 0 !important;
  }

  //
  //:not(:last-of-type) {
  //  margin-bottom: 4px;
  //}
`
export const GroupExercise = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 12px;
  align-items: center;

  :not(:last-of-type) {
    margin-bottom: 4px;
  }
`

export const GroupInside = styled.div`
  background-color: #1c1c1e;
  display: grid;
  grid-template-columns: auto 60px 60px auto 30px;
  padding: 8px;
  gap: 12px;
  border-radius: 10px;
  align-items: center;

  :not(:last-of-type) {
    margin-bottom: 4px;
  }
`
