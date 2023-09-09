import styled from 'styled-components'
import Paragraph from 'antd/lib/typography/Paragraph'

export const EditCustom: any = styled(Paragraph)`
  ${(props: any) => `
  
    :after {
    content: '${props?.content ? props?.content : ''}' ;
    display:flex;
    margin-left: 6px;
    color:#434343 !important;
    width:100%;
    font-size:18px;
    position: absolute;
    bottom:-3px;
    left:50px;
  }

  `}
  line-break: anywhere;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 !important;
  margin: 0 !important;
  color: #ffffff !important;

  .anticon-edit {
    font-size: 10px;
  }

  .ant-input {
    color: #ffffff !important;
    //height: auto;
    //width: auto;
  }

  font-size: ${(props: any) => (props.font ? props.font + 'px' : '12px')};
`
