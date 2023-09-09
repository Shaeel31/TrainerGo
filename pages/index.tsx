import React from 'react'
import AuthLayout from '../layout/default'
import { AuthForm } from '../blocks/form'
import Link from 'next/link'
import CheckPick from '../components/checkbox'
import { SocialLogins } from '../blocks/social-login'
import { useAppDispatch } from '../store/configureStore'
import { userLogin } from '../store/users/actions'
import { useSelector } from 'react-redux'

function Index(): any {
  const fields: Field[] = [
    {
      label: 'email',
      name: 'email',
      type:'email',
      rules: [
        {
          required: true,
          message: 'please enter email!',
        },
      ],
    },
    {
      label: 'password',
      name: 'password',
      type:'password',
      rules: [
        {
          required: true,
          message: 'please enter password!',
        },
      ],
    },
  ]
  const { isLoading } = useSelector((state: any) => state.users)
  const dispatch = useAppDispatch()
  const onFinish = (values: any) => {
    dispatch(userLogin(values))
  }

  const checked = <CheckPick>Keep me logged In.</CheckPick>

  const form = (
    <AuthForm
      title="Log In"
      isLoading={isLoading}
      check={checked}
      fields={fields}
      onFinish={onFinish}
    >
      <SocialLogins />
    </AuthForm>
  )
  const _desc = (
    <div style={{ color: '#ffffff' }}>
      Don’t have an account?
      <Link href="/register">
        <a>
          {' '}
          <b>Sign Up</b>{' '}
        </a>
      </Link>
      here.
    </div>
  )
  return (
    <AuthLayout title="Log In" description={_desc}>
      {form}
    </AuthLayout>
  )
}

export default Index
