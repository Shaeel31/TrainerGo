import React, { memo } from 'react'
import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import AuthLayout from '../layout/default'
import CheckPick from '../components/checkbox'
import { userRegister } from '../store/users/actions'
import { AuthForm } from '../blocks/form'

function Register(): any {
  const registerFields: Field[] = [
    {
      label: 'name',
      name: 'name',
      type:'text',
      rules: [
        {
          required: true,
          message: 'please enter name!',
        },
      ],
    },
    {
      label: 'e-mail',
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
      label: 'Password',
      name: 'password',
      type:'password',
      rules: [
        {
          required: true,
          message: 'please enter password!',
        },
      ],
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type:'password',
      rules: [
        {
          required: true,
          message: 'please enter confirm password!',
        },
      ],
    },
  ]
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: any) => state.users)
  const onFinish = (values: any) => {
    dispatch(userRegister(values))
  }
  const checked = <CheckPick>Account terms & conditions.</CheckPick>
  const form = (
    <AuthForm
      title="Sign Up"
      check={checked}
      fields={registerFields}
      onFinish={onFinish}
      isLoading={isLoading}
    />
  )
  const _desc = (
    <div style={{ color: '#ffffff' }}>
      Already have an account?
      <Link href="/">
        <a>
          {' '}
          <b>Log In </b>
        </a>
      </Link>
      here.
    </div>
  )
  return (
    <AuthLayout title="Sign Up" description={_desc}>
      {form}
    </AuthLayout>
  )
}

export default memo(Register)
