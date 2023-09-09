import * as React from 'react'
import { CSSProperties, FC, memo } from 'react'
import { useDrag } from 'react-dnd'
import {
  YouTubeCardPlayer,
  YouTubeCardWindow,
  VideoDescription,
} from '../../../screens/exerciseSettings/youtube/styled'
import Avatar from 'antd/lib/avatar/avatar'

interface BoxProps {
  item: any
  type: string
  isDropped: boolean
}

export const YouCard: FC<BoxProps> = memo(function Box({ item, type }) {
  const [{ opacity, border }, drag] = useDrag(
    () => ({
      type,
      item,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        border: monitor.isDragging() ? '1px dashed gray' : 'none',
      }),
    }),
    [item, type]
  )

  const style: CSSProperties = {
    // border: '1px dashed gray',
    // width: '100%',
    // // backgroundColor: 'white',
    // // padding: '0.5rem 1rem',
    // marginRight: '1.5rem',
    marginBottom: '15px',
    cursor: 'move',
    // float: 'left',
  }
  return (
    <YouTubeCardWindow
      ref={drag}
      role="Box"
      style={{ ...style, opacity, border }}
    >
      <YouTubeCardPlayer
        bordered={false}
        cover={
          <img
            height={200}
            width="100%"
            src={item?.videoThumbnails?.high?.url}
          />
        }
      >
        <VideoDescription>
          <Avatar
            size="small"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <a href={item?.videoLink} target="_blank">{item?.channelTitle}</a>
        </VideoDescription>
        {/* <Meta
          // description={
          //   <Paragraph
          //     ellipsis={{
          //       rows: 1.5,
          //       suffix: '...',
          //       expandable: false,
          //     }}
          //   >
          //     {item?.description}
          //   </Paragraph>
          // }
        /> */}
      </YouTubeCardPlayer>
      {/*<Video>*/}
      {/*  <ReactPlayer height="100%" width="100%" url={item?.videoLink} />*/}
      {/*</Video>*/}
      {/*<div>*/}
      {/*  details*/}
      {/*</div>*/}
      {/*{isDropped ? <s>{name}</s> : name}*/}
    </YouTubeCardWindow>
  )
})
