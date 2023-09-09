import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginService, logout, register, updateUser, deleteUser } from '../../../reduxServices/authServices'
import { setActiveId } from '../../workout'

export const ACTION = {
  FIREBASE_USER_REGISTER: 'FIREBASE_USER_REGISTER',
  FIREBASE_USER_LOGIN: 'FIREBASE_USER_LOGIN',
  FIREBASE_USER_LOGOUT: 'FIREBASE_USER_LOGOUT',
  FIREBASE_USER_UPDATE: 'FIREBASE_USER_UPDATE',
}

export const userRegister: any = createAsyncThunk(
  ACTION.FIREBASE_USER_REGISTER,
  async (
    { name, email, password, confirmPassword }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await register(
        name,
        email,
        password,
        confirmPassword
      )
      dispatch(setActiveId(response?.data?.activeWorkout))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const userLogin: any = createAsyncThunk(
  ACTION.FIREBASE_USER_LOGIN,
  async ({ email, password }: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await loginService(email, password)
      dispatch(setActiveId(response?.data?.activeWorkout))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const userLogout: any = createAsyncThunk(
  ACTION.FIREBASE_USER_LOGOUT,
  async ({ rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await logout()
      dispatch(setActiveId(null))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)

export const userUpdate: any = createAsyncThunk(
  ACTION.FIREBASE_USER_UPDATE,
  async (
    {
        name,
        email,
        profileImage,
        logo,
        linkedin,
        youtube,
        facebook, 
        tiktok,
        twitter,
        instagram, 
        other,
        password,
        newPassword,
        confirmNewPassword
      }: any,
    { rejectWithValue, dispatch }: any
  ) => {
    try {
      const response: any = await updateUser({
        name,
        email,
        profileImage,
        logo,
        linkedin,
        youtube,
        facebook, 
        tiktok,
        twitter,
        instagram, 
        other,
        password,
        newPassword,
        confirmNewPassword
    })
      // dispatch(setActiveId(response?.data?.activeWorkout))
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)


export const userDelete: any = createAsyncThunk(
  ACTION.FIREBASE_USER_LOGOUT,
  async ({ password, router }: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response: any = await deleteUser(password)
      console.log("del",password, router,response)
      dispatch(setActiveId(null))
      // if(response.status == 200) {
      //   console.log("USER DELETED")
      //   router.push("/")
      //   dispatch(setActiveId(null))
      // }
      return response
    } catch (err: any) {
      return rejectWithValue([], err)
    }
  }
)