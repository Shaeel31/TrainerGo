import styled from 'styled-components'

export const BlockContainer = styled.div`
  width: auto;
  padding: 7px 18px 7px 16px;
  border-radius: 30px;
  background-color: #000000;
  display: grid;
  grid-template-rows: auto auto auto;
`
export const BlockTop = styled.div`
  //background: red;
  display: grid;
  grid-template-columns: 50px minmax(0, 110px) auto auto auto;
  gap: 8px;
  //justify-content: space-between;
  //gap: 12px;
  //.ant-typography {
  //  font-size: 14px;
  //}
  //
  //@media (max-width: 1300px) {
  //}
`
export const BlockContent = styled.div`
  //padding: 8px 0;
  //min-height: 50px;
`
export const IndexSec: any = styled.div`
  max-height: 20px;
  p {
    margin: 0 !important;
    font-size: 2.3em;
    position: relative;
    color: #6d6d6d;

    :after {
      position: absolute;
      content: '';
      bottom: 14px;
      background: #6d6d6d;
      height: 2.8px;
      width: 2.8px;
      margin-right: 15px;
    }
  }

  //height: 48px;
  //b {
  //  background: #13be05;
  //  position: relative;
  //  font-size: 40px;
  //  font-weight: 600;
  //  padding: 0 !important;
  //  margin: 0 !important;
  //
  //  :after {
  //    position: absolute;
  //    content: '';
  //    bottom: 0.4px;
  //    background: #6d6d6d;
  //    height: 5.5px;
  //    width: 5px;
  //    margin-right: 15px;
  //  }
  //}

  //
  //h1.ant-typography {
  //  position: absolute;
  //  background: purple;
  //  font-size: 2.7em;
  //  font-weight: 600;
  //  color: #6d6d6d;
  //  top: 0;
  //  left: 0;
  //  bottom: 0;
  //  margin: 0 !important;
  //  padding: 0 !important;

  //:after {
  //  position: absolute;
  //  content: '';
  //  bottom: 0.4px;
  //  background: #6d6d6d;
  //  height: 5.5px;
  //  width: 5px;
  //  margin-right: 15px;
  //}
`
export const ActionSec: any = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`
export const OtherSec: any = styled.div`
  .counter {
    input {
      font-size: 14px;
    }
    button {
      width: auto !important;
    }
  }
  .ant-typography-edit-content .ant-input {
    min-width: 120px !important;
  }
  //position: relative;

  //:after {
  //  content: "some";
  //  position: absolute;
  //  font-size: 10px;
  //  right: 0;
  //  bottom: 0.4px;
  //  color: #6d6d6d;
  //  margin-right: 15px;
  //}

  //display: flex;
  ////background: red;
  //margin-top: 8px;
  //flex-direction: column;
  //justify-content: flex-start;
  //align-items: flex-start;
`
export const SecTitle = styled.div`
  color: #6d6d6d;
  @media (max-width: 1336px) {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
export const SecContent = styled.div`
  .ant-select-selector {
    width: 100%;
    padding: 0 !important;
  }

  h3.ant-typography {
    color: #ffffff;
  }

  //.ant-select-single .ant-select-selector .ant-select-selection-item
  .ant-select-selection-item {
    height: 20px;
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
    //padding: 0 30px 0 0;
    //padding-right: 28px !important;
    right: 0;
    line-height: 1.6 !important;
    //display: flex;
    //align-items: flex-start;
  }

  .ant-select-arrow {
    top: 30%;
    padding-left: 8px;
    //width: auto;
    //height: auto;
  }

  //content: url("/icons/arrow.svg");
  .ant-select-arrow .anticon {
    background: rgba(174, 205, 70, 0.2);

    //display: flex;
    //justify-content: center;
    //align-items: center;
    //border-radius: 10px;
    color: #29d97b;
  }

  .ant-select-arrow .anticon > svg {
  }

  @media (max-width: 1336px) {
    .ant-input {
      font-size: 14px;
    }

    .ant-typography {
      //width: 40px !important;
      //overflow:hidden !important;
      //white-space:nowrap !important;
      //text-overflow: ellipsis !important;
    }
  }
`
export const BlockFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: center;
`
export const FooterButtons = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;

  div:not(:last-of-type) {
    margin-right: 12px;
  }
`
export const FooterTime = styled.div`
  h1 {
    color: #6d6d6d;
    margin: 0 !important;
    padding: 0 !important;
  }
`
export const BlockActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end !important;
  //padding-right: 8px;
`

export const Action = styled.div`
  padding: 8px;
  cursor: pointer;

  img {
    height: 25px;
  }

  &:not(:last-of-type) {
    margin-right: 8px;
  }
`
