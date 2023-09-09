import {
  AuthContainer,
  TextGroup,
  AuthContent,
  AuthSider,
  FormContainer,
} from './style'
import { FC, memo, ReactNode } from 'react'
import Title from 'antd/lib/typography/Title'
import Paragraph from 'antd/lib/typography/Paragraph'

type Props = {
  title?: string
  description?: ReactNode | any
  children: ReactNode
}
const AuthLayout: FC<Props | any> = (props) => {
  return (
    <AuthContainer>
      <AuthSider>
        <img src="/text-logo.svg" alt="" />
      </AuthSider>
      <AuthContent>
        <FormContainer>
          <TextGroup>
            <Title level={1}>{props.title}</Title>
            <Paragraph>{props.description}</Paragraph>
          </TextGroup>
          {props.children}
        </FormContainer>
      </AuthContent>
    </AuthContainer>
  )
}

export default memo(AuthLayout)
