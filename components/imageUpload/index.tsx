// @flow
import * as React from 'react'
import { memo } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { CloseCircleOutlined } from '@ant-design/icons'
import { ImageUploadContainer, ImageUploadBox, ImageUploadCancel } from './styled'
import { beforeUpload } from '../../libs/image'

type Props = {
  loading?: boolean
  imageUrl?: any
  handleChange?: any
  isCancel: boolean
  onCancel: any
}

const ImageUpload = (props: Props) => {
  const { loading, imageUrl, handleChange, isCancel, onCancel } = props

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <img src="/icons/image.svg" alt="image" />
      )}
      <div style={{ color: '#3cff8f' }}>Upload file</div>
    </div>
  )

  return (
    <ImageUploadContainer>
      <ImageUploadBox
        iconRender={() => <img src="/icons/image.svg" alt="image" />}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </ImageUploadBox>
      {isCancel && (<ImageUploadCancel onClick={onCancel}><CloseCircleOutlined /></ImageUploadCancel>) }
    </ImageUploadContainer>
  )
}
export default memo(ImageUpload)
