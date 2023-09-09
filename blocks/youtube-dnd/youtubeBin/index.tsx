import * as React from 'react'
import { CSSProperties, FC, memo } from 'react'
import { useDrop } from 'react-dnd'
import ReactPlayer from 'react-player/lazy'
import {
  MainEditBox,
  MainHeader,
  PlayerBox,
  PlayerContainer,
  PLayerLinks,
  PlayerWindow,
  EditBox,
  DropText,
  InstructionText,
  EditCustom,
  VideoPlayer,
  VideoThumbnail
} from '../../../screens/exerciseSettings/main/styled'
import Title from 'antd/lib/typography/Title'
import Editable from '../../../components/editField'
import Button from '../../../components/button'
import { useState } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"),{
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import 'react-quill/dist/quill.snow.css';
import { EditOutlined, EnterOutlined } from '@ant-design/icons';

interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any
  meta?: any
  onChange?: any
  id?: any
  onDrop: (item: any) => void
}

export const YouTubeBin: FC<DustbinProps> = memo(function Dustbin({
  id,
  meta,
  accept,
  onChange,
  lastDroppedItem,
  onDrop,
}) {
  const style2: CSSProperties = {
    width: '100%',
    // height: '100%',
    // marginBottom: '1.5rem',
    // minHeight: '2rem',
    // color: 'white',
  }
  const [value, setValue] = useState<string>(meta[`${id}Instructions`])
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isPlay, setIsPlay] = React.useState<boolean>(false)

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  // let backgroundColor = 'transparent'
  // const height = '100%'
  let backgroundColor = 'transparent'
  if (isActive) {
    backgroundColor = '#3cff8f'
    // height = '600px'
  } else if (canDrop) {
    // height = '600px'
  }

  const onChangeEdit = (val) => {
      setValue(val)
      onChange({ target: { id: `${id}Instructions`, value, } })
  }

  const onEdit = () => {
    setIsEdit(!isEdit)
  }

  const handelPlay = () => {
    setIsPlay(!isPlay)
  }

  return (
    <>
      <MainHeader>
        <MainEditBox>
          <Title level={3}>exercise name</Title>
          <Editable
            text={meta[`${id}Title`]}
            onChange={(e) =>
              onChange({ target: { id: `${id}Title`, value: e } })
            }
            size={16}
          />
        </MainEditBox>
        <MainEditBox>
          <Title level={3}>instructions</Title>
            <EditBox
             visible={isEdit}
             okText="Save"
             onOk={onEdit}
             onCancel={onEdit}
            >
              <ReactQuill value={value} onChange={onChangeEdit}/>
              {/* <EnterOutlined onClick={onEdit} /> */}
            </EditBox>
            <InstructionText>
              <p className="para" dangerouslySetInnerHTML={{ __html: value }}/>
              <EditOutlined onClick={onEdit} />
            </InstructionText>
          {/* <Editable
            maxheight={250}
            max={400}
            text={meta[`${id}Instructions`]}
            row_max={9}
            size={14}
            onChange={(e) =>
            }
          /> */}
        </MainEditBox>
      </MainHeader>
      <PlayerContainer>
        <PlayerBox>
          <PlayerWindow
            ref={drop}
            role="Dustbin"
            style={{ ...style2, backgroundColor, padding: '10px 0 0 0' }}
          >
            {(meta[`${id}TechnicalYtLink`]) ? (
              <Button type="primary" onClick={() => onDrop(lastDroppedItem?.videoLink || meta[`${id}TechnicalYtLink`])} size="small" shape="round">
                Remove
              </Button>
            ) : 
             <DropText>Drop Video</DropText>
            }
            {(meta?.image && id == "main") && 
              <VideoThumbnail onClick={handelPlay}>
                <img src={meta?.image} />
              </VideoThumbnail>
            }
            {(meta?.altImage && id == "alt") && 
              <VideoThumbnail onClick={handelPlay}>
                <img src={meta?.altImage} />
              </VideoThumbnail>
            }
            <VideoPlayer
              okText="close"
              onOk={handelPlay}
              onCancel={handelPlay}
              visible={isPlay}
            >
            <ReactPlayer
              className="player"
              height="100%"
              width="100%"
              controls
              url={
                lastDroppedItem?.videoLink
                  ? lastDroppedItem?.videoLink
                  : meta[`${id}TechnicalYtLink`]
              }
            />
            </VideoPlayer>

            {/*<img*/}
            {/*  src={*/}
            {/*    lastDroppedItem?.videoThumbnails?.high?.url*/}
            {/*      ? lastDroppedItem?.videoThumbnails?.high?.url*/}
            {/*      : meta?.image*/}
            {/*  }*/}
            {/*  alt=""*/}
            {/*/>*/}
            {/*<iframe*/}
            {/*  height="180"*/}
            {/*  width="100%"*/}
            {/*  src={lastDroppedItem?.videoThumbnails?.high?.url ? lastDroppedItem?.videoThumbnails?.high?.url : meta?.addedInLibrary}*/}
            {/*  title="YouTube video player"*/}
            {/*  frameBorder="0"*/}
            {/*  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*  allowFullScreen*/}
            {/*></iframe>*/}
          </PlayerWindow>
          {/*<PlayerWindow>*/}
          {/*  /!*<video width="320" height="240" controls>*!/*/}
          {/*  /!*  <source src="https://youtu.be/YdB1HMCldJY" type="video/mp4"/>*!/*/}
          {/*  /!*  <source src="https://youtu.be/YdB1HMCldJY" type="video/ogg"/>*!/*/}
          {/*  /!*  Your browser does not support the video tag.*!/*/}
          {/*  /!*</video>*!/*/}

          {/*  /!*<iframe*!/*/}
          {/*  /!*  height="100%"*!/*/}
          {/*  /!*  src="https://www.youtube.com/embed/YdB1HMCldJY"*!/*/}
          {/*  /!*  title="YouTube video player"*!/*/}
          {/*  /!*  frameBorder="0"*!/*/}
          {/*  /!*  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*!/*/}
          {/*  /!*  allowFullScreen*!/*/}
          {/*  /!*></iframe>*!/*/}
          {/*</PlayerWindow>*/}
          <PLayerLinks>
            {/*<MainEditBox>*/}
            {/*  <Title level={3}>demo</Title>*/}
            {/*  <Editable*/}
            {/*    text={*/}
            {/*      lastDroppedItem*/}
            {/*        ? lastDroppedItem[`${id}DemoYtLink`]*/}
            {/*        : meta[`${id}DemoYtLink`]*/}
            {/*    }*/}
            {/*    onChange={(e) =>*/}
            {/*      onChange({ target: { id: `${id}DemoYtLink`, value: e } })*/}
            {/*    }*/}
            {/*    size={16}*/}
            {/*  />*/}
            {/*</MainEditBox>*/}
            <MainEditBox>
              <Title level={3}>technical</Title>
              <EditCustom
                editable={
                  {
                    icon: '',
                    tooltip: true,
                    // editing: true,
                    onStart: null,
                    onChange: (e) => onChange({ target: { id: `${id}TechnicalYtLink`, value: e } }),
                    onCancel: null,
                    onEnd: null,
                  }
                }
              >
                {meta[`${id}TechnicalYtLink`]}
              </EditCustom>
            </MainEditBox>
            <MainEditBox>
              <Title level={3}>demo</Title>
              <EditCustom
                editable={
                  {
                    icon: '',
                    tooltip: true,
                    // editing: true,
                    onStart: null,
                    onChange: (e) => onChange({ target: { id: `${id}DemoLink`, value: e } }),
                    onCancel: null,
                    onEnd: null,
                  }
                }
              >
                {
                  meta[`${id}DemoLink`]
                    ? meta[`${id}DemoLink`]
                    : ""
                }
              </EditCustom>
            </MainEditBox>
          </PLayerLinks>
        </PlayerBox>
      </PlayerContainer>
    </>
  )
})
