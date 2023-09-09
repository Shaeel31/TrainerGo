import styled from 'styled-components'

export const Container = styled.div`
  max-width: 880px;
  margin:0 auto;
  padding: 0 25px;
  grid-column: 1/3;
  width: 100%;
`
export const UserName = styled.h1`
  font-size: 36px;
  width: calc(100% - 125px);
  margin: 0 0 0 auto;
`

export const TabsContainer = styled.div`
  padding: 40px 0;
   .ant-tabs-nav-list {
      padding:90px 0 0; 
   }
   .ant-tabs-tab-btn{
     color:#fff
   }
  .ant-tabs-tab.ant-tabs-tab-active{
    background:#000;
    border-radius: 24px 0 0 24px;
    position:relative;
    &:before,
    &:after {
       content:"";
       display:block; 
       background:#000;
       width:16px;
       height:16px;
       position:absolute;
       right: -8px;
       bottom: -8px;
       transform: rotate(45deg)
    }
    &:before {
       bottom: unset;
       top:-8px;
    }
  }
  .ant-tabs-content-holder{
    margin-left: 0;
    border-left: none;
    padding: 25px 0;
  }
  .ant-tabs-content-holder .ant-tabs-tabpane {
      padding: 0 !important;
  }
`

