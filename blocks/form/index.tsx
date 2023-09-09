import React, { FC, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from 'antd'
import { useSelector } from 'react-redux'
import { FormContainer } from './style'
import { Submit } from '../../components/formButton'
import { FormInput } from '../../components/formInput'

type Props = {
  title?: string | any
  fields?: Field[]
  check: string | any
  onFinish?: any
  isLoading?: boolean
  onFinishFailed?: any
  layout?: any
  submitButton?: any
  requiredMarkValue?: any
  onValuesChange?: any
  children?: any
}
type RM = boolean | 'optional'
const submitButton = { wrapperCol: { span: 12, offset: 6 } }
const Index: FC<Props | any> = (props) => {
  const { isAuthenticated } = useSelector((state: any) => state.users)

  const { title, fields, isLoading, check, ...rest } = props
  const [form] = Form.useForm()
  const [rM, setRM] = useState<RM>('optional')
  const [, forceUpdate] = useState({})
  const onRMChange = ({ rMV }: { rMV: RM }) => {
    setRM(rMV)
  }

  const router = useRouter()
  useEffect(() => {
    forceUpdate({})
    isAuthenticated && router.push('/builder')
  }, [isAuthenticated])

  const layout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } }

  // const onFinishFailed = (errorInfo: any) => {
  //   // console.log('Failed:', errorInfo)
  // }

  return (
    <FormContainer
      {...layout}
      name="basic"
      layout="vertical"
      form={form}
      initialValues={{ rM }}
      onValuesChange={onRMChange}
      // onFinishFailed={onFinishFailed}
      {...rest}
    >
      {fields.map((field, idx) => (
        <FormInput key={idx} {...field} />
      ))}
      <Form.Item>{check}</Form.Item>
      <Form.Item shouldUpdate {...submitButton}>
        {() => <Submit loading={isLoading}>{title}</Submit>}
      </Form.Item>
      {props.children}
    </FormContainer>
  )
}
export const AuthForm = memo(Index)
