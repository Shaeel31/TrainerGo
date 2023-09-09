// @flow
import * as React from 'react'
import {
  VideoDesc,
  VideosContainer,
  VideoSection,
  VideoThumbnail,
  VideoTitle,
  VideoPlayer,
  VideosWrapper
} from './styled'
import ReactPlayer from 'react-player/lazy'


// type Props = {}
export const Videos = ({ exercise }) => {
  const [isPlay, setIsPlay] = React.useState(false)
  const [videoLink, setVideoLink] = React.useState("")
  const handelPlay = (link) => {
    setVideoLink(link)
    setIsPlay(!isPlay)
  }
  return (
    <VideosWrapper>
      <VideosContainer>
        <VideoSection>
          <VideoThumbnail>
            {exercise?.mainTechnicalYtLink && (
              <>
                <img onClick={() => handelPlay(exercise?.mainTechnicalYtLink)} src={exercise?.image ? exercise?.image : "/trener.jpg"} alt="exercise" />
                <img className="icon" src="/icons/play.svg" alt="play icon" />
              </>
            )}
          </VideoThumbnail>
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
                url={videoLink}
              />
          </VideoPlayer>
          <VideoTitle content="main">
            <b>{exercise?.mainTitle}</b>
          </VideoTitle>
          <VideoDesc dangerouslySetInnerHTML={{ __html: exercise?.mainInstructions }} />
        </VideoSection>
        <VideoSection>
          <VideoThumbnail>
          {exercise?.altTechnicalYtLink && (
            <>
              <img onClick={() => handelPlay(exercise?.altTechnicalYtLink)} src={exercise?.altImage ? exercise?.altImage : "/trener.jpg"} alt="exercise" />
              <img className="icon" src="/icons/play.svg" alt="play icon" />
            </>
          )}
          </VideoThumbnail>
          <VideoTitle content="ALT">
            <b>{exercise?.altTitle}</b>
          </VideoTitle>
          <VideoDesc dangerouslySetInnerHTML={{ __html: exercise?.altInstructions }} />
        </VideoSection>
      </VideosContainer>
    </VideosWrapper>
  )
}
