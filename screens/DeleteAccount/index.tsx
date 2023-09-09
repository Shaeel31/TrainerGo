// @flow
import * as React from 'react'
import { useState } from 'react'
import {
  CockpitScreenContainer,
  Title,
  SubTitle,
  DeleteBtn,
  WarningText,
  CancelBtn,
  FormControl,
  InputLabel,
  FormInput
} from './styled'
import { userDelete } from './../../store/users/actions'
import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { useRouter } from 'next/router';



const DeleteAccount: any  = (props) => {
  const { open, onOpen, onCancel, email } = props
  const [ password, setPassword ] = useState()
  const dispatch = useDispatch()
  const router = useRouter()

  const onDelete = () => {
    // router.push('/')
    dispatch(userDelete({password, router}))
  }
  return (
    <CockpitScreenContainer
      visible={open}
      okText="Save"
      cancelText="cancel"
      closable={true}
      onOk={onOpen}
      onCancel={() => onCancel()}
    >
      <Title>Delete user account</Title>
       <SubTitle>This can not be undone, so proceed with care!</SubTitle>
       <WarningText>{`Your user account ${email} will be permanently deleted.`}</WarningText>
       <FormControl>
          <InputLabel>Password</InputLabel>
          <FormInput value={password} onChange={(e: any) => setPassword(e.target.value)} type="password" />
      </FormControl>
      <CancelBtn onClick={onCancel} >Cancel</CancelBtn>
      <DeleteBtn type="primary" onClick={onDelete} >Delete</DeleteBtn>
    </CockpitScreenContainer>
  )
}
export default memo(DeleteAccount)
