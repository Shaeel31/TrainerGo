import * as React from 'react'
import { memo, useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import { Form, Input, Button } from 'antd';
import { userUpdate } from './../../store/users/actions'
import {
    UserProfile, 
    InputTitle, 
    FormControl, 
    FormInput,
    UserSocialMedia, 
    UserDeleteAccount,
    DeleteWarning,
    DeleteBtn,
    UserMedia,
    UserLogo,
    UserProfilePic,
    MediaInfo
} from "./styled"
import ImageUpload from '../../components/imageUpload'
import DeleteAccount from './../DeleteAccount'
import { getBase64 } from './../../libs/image'

const PersonalSettings: any = (props) => {

  const { title, fields, isLoading, check, ...reset } = props
  const {
    users: { isAuthenticated, currentUser },
  } = useSelector((state: RootState) => state)

  const [state, setState] = useState<{
    name: string,
    open: boolean
  }>({
    name: "",
    open: false,
  })

  const dispatch = useDispatch()

  const [data, setData] = useState<{
    image: any,
  }>({
    image: "",
  })

  const [profileImage, setProfileImage] = useState<{
    loading: boolean
    imageUrl: any
  }>({
    loading: false,
    imageUrl: currentUser?.profileImage,
  })

  const [logoImage, setLogoImage] = useState<{
    loading: boolean
    imageUrl: any,
    fileName: string,
  }>({
    loading: false,
    imageUrl: currentUser?.logo,
    fileName: "",
  })

  const router = useRouter()
  useEffect(() => {
    !isAuthenticated && router.push('/')
  }, [isAuthenticated])

  const handleImageChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setProfileImage({ ...profileImage, loading: true })
    }
    if (info.file.status === 'done') {
        console.log(info)
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, (imageUrl) => {
        setProfileImage({
          imageUrl,
          loading: false,
        })
        setData({ ...data, image : imageUrl })
        dispatch(userUpdate({profileImage: imageUrl}))
      })
    }
  }

  const onDelete = () => {
    setState({...state, open: !state.open  })
  }

  const handleLogoImage = (info: any) => {
    if (info.file.status === 'uploading') {
        setLogoImage({ ...logoImage, loading: true })
    }
    if (info.file.status === 'done') {
        console.log(info)
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, (imageUrl) => {
        setLogoImage({
          fileName: info.file.name,  
          imageUrl,
          loading: false,
        })
        setData({ ...data, image : imageUrl })
        dispatch(userUpdate({logo: imageUrl}))
      })
    }
  }

  const onCancel = (type) => {
     if(type == "logo") {
        setLogoImage({
          fileName: "",  
          imageUrl: "",
          loading: false 
        })
        dispatch(userUpdate({logo: ""}))
     }else {
      setProfileImage({
        imageUrl:"",
        loading: false
      })
      dispatch(userUpdate({profileImage: ""}))
     }
  }

  const onFinish = (values: any) => {
    let data = {}
    Object.entries(values).filter( item => {
      if(item[1] != undefined) data[item[0]] = item[1]  
    })
    console.log("user update",data)
    dispatch(userUpdate(data))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
        <UserProfile>
                <Form
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                  >
                    <InputTitle>User Name</InputTitle>
                    <FormControl
                      label="Name"
                      name="name"
                    >
                        <FormInput type="text" defaultValue={currentUser?.name}/>
                    </FormControl>
                    <InputTitle>E-mail</InputTitle>
                    <FormControl 
                      label="E-mail"
                      name="email"
                    >
                        <FormInput disabled type="email" defaultValue={currentUser?.email}/>
                    </FormControl>
                    <InputTitle>Password</InputTitle>
                    <FormControl
                      label="Current Password"
                      name="password"
                    >
                         <Input.Password />
                    </FormControl>
                    <FormControl
                      label="New Password"
                      name="newPassword"
                    >
                         <Input.Password />
                    </FormControl>
                    <FormControl
                      label="Confirm Password"
                      name="confirmNewPassword"
                    >
                        <Input.Password />
                    </FormControl>
                    <FormControl>
                      <Button type="primary" htmlType="submit">
                        Save Changes
                      </Button>
                    </FormControl>
                  </Form>
                </UserProfile>
        <UserMedia>
            <UserLogo>
                <InputTitle>Logo</InputTitle> 
                <MediaInfo>Use for green screen. Upload 500X500 in JPG or PNG Formate</MediaInfo>
                <ImageUpload
                    imageUrl={logoImage?.imageUrl ? logoImage?.imageUrl : ""}
                    loading={logoImage.loading}
                    handleChange={handleLogoImage}
                    isCancel={logoImage?.imageUrl}
                    onCancel={() => onCancel("logo")}
                />
            </UserLogo>
            <UserProfilePic>
                <InputTitle>Profile</InputTitle> 
                <MediaInfo>Upload 500X500 in JPG or PNG Formate</MediaInfo>
                <ImageUpload
                    imageUrl={profileImage?.imageUrl ? profileImage?.imageUrl : ""}
                    loading={profileImage.loading}
                    handleChange={handleImageChange}
                    isCancel={profileImage?.imageUrl}
                    onCancel={() => onCancel("profileImg")}
                />
            </UserProfilePic>
        </UserMedia>
        <UserSocialMedia>
            <InputTitle>Social</InputTitle>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
                    <FormControl
                      label="Facebook"
                      name="facebook"
                    >
                        <FormInput type="url" defaultValue={currentUser?.facebook} />
                    </FormControl>
                    <FormControl 
                      label="Twitter"
                      name="twitter"
                    >
                        <FormInput type="url" defaultValue={currentUser?.twitter} />
                    </FormControl>
                    <FormControl
                      label="TikTok"
                      name="tiktok"
                    >
                      <FormInput type="url" defaultValue={currentUser?.tiktok}/>
                    </FormControl>
                    <FormControl
                      label="Instagram"
                      name="instagram"
                    >
                      <FormInput type="url" defaultValue={currentUser?.instagram}/>
                    </FormControl>
                    <FormControl
                      label="LinkedIn"
                      name="linkedin"
                    >
                      <FormInput type="url" defaultValue={currentUser?.linkedin}/>
                    </FormControl>
                    <FormControl
                      label="YouTube"
                      name="youtube"
                    >
                      <FormInput type="url" defaultValue={currentUser?.youtube}/>
                    </FormControl>
                    <FormControl
                      label="Other"
                      name="other"
                    >
                      <FormInput type="url" defaultValue={currentUser?.other}/>
                    </FormControl>
                    <FormControl>
                      <Button type="primary" htmlType="submit">
                        Save Changes
                      </Button>
                    </FormControl>
                  </Form>
        </UserSocialMedia>
        <UserDeleteAccount>
            <InputTitle>User Account</InputTitle> 
            <DeleteWarning>Permanently delete your user account and data, effective immediately</DeleteWarning>
            <DeleteBtn onClick={onDelete}>Delete user account</DeleteBtn>
        </UserDeleteAccount>
        <DeleteAccount 
        open={state.open} 
        onOpen={onDelete} 
        onCancel={onDelete}
        email={currentUser?.email}
        />
    </>
  )
}

export default memo(PersonalSettings)
