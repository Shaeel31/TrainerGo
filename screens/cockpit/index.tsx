// @flow
import * as React from 'react'
import { memo, useEffect, useState, useRef } from 'react'
import {
  ExerciseDetailContainer,
  ExerciseWrap,
  LogoContainer,
  MockContainer,
  PlayBar,
  PlayLineContainer,
  TimeContainer,
  VideoContainer,
  ExerciseMod,
  ModWrap,
  ModImage,
  TimeLeft,
  CameraPopUp,
  CameraBtn,
  CameraTitle,
  ExerciseTime
} from './styled'
import Title from 'antd/lib/typography/Title'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/reducers'
import Loading from "./../../blocks/loading"


const CockpitScreen = ({ exercise }) => {
  
  const {
    users: { currentUser },
  } = useSelector((state: RootState) => state)

  const [mediaStream, setMediaStream] = useState();
  const [open, setOpen] = useState(true);
  const videoRef = useRef(null);


  useEffect(() => {
    handelCamera()
  }, [mediaStream])

  const handelCamera = async () => {
    if (!mediaStream) {
      await setupMediaStream();
    } else {
      const videoCurr = videoRef.current;
      if (!videoCurr) return;
      const video = videoCurr;
      if (!video.srcObject) {
        video.srcObject = mediaStream;
      }
    }

    if(!mediaStream) {
      await handelCamera();
    }

  }

  async function setupMediaStream() {
    try {
      const ms: any = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
      setMediaStream(ms);
    } catch (e) {
      alert("Camera is disabled");
      throw e;
    }
  }

  // const handelModal = () => {
  //   setOpen(!open)
  // }

  return (
    <MockContainer>
      { exercise?.currentExerciseTime ? 
         <>
          <VideoContainer>
            <video className="video" ref={videoRef} autoPlay muted />
          </VideoContainer>
          {/* <CameraPopUp
          visible={open}
          okText="Save"
          cancelText="cancel"
          closable={true}
          onOk={handelModal}
          onCancel={handelModal}
          >
            <CameraTitle>Choose Background</CameraTitle>
            <CameraBtn type="primary" onClick={handelCamera}>Open camera</CameraBtn>
            <CameraBtn type="primary" onClick={handelModal}>Use Default</CameraBtn>
          </CameraPopUp> */}
          <LogoContainer>
            <img src={currentUser?.logo ? currentUser.logo :"black-text.svg"} alt="black-text" />
          </LogoContainer>
          <TimeContainer>
            <ExerciseTime>{moment.utc((exercise?.currentExerciseTime - exercise?.consumedExerciseTime)*1000).format('m:ss')}</ExerciseTime>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" strokeDasharray={`${((((exercise?.currentExerciseTime - exercise?.consumedExerciseTime) / exercise?.currentExerciseTime) * 100) * 820) / 100}, 820`}>
              <rect x="-50" y="16" width="140" height="100" rx="60" ry="80"></rect>
            </svg>
          </TimeContainer> 

          <PlayLineContainer>
            <PlayBar
              count={45}
              size="small"
              type="line"
              format={() => (
                <TimeLeft left={((exercise?.consumedTime / exercise?.totalTime) * 100 )} >left: <strong>{moment.utc((exercise?.totalTime - exercise?.consumedTime)*1000).format('mm:ss')}</strong></TimeLeft>
              )}
              trailColor="#00000042"
              strokeColor="#ffffff"
              strokeWidth={12}
              width={50}
              strokeLinecap="round"
              showInfo={true}
              percent={((exercise?.consumedTime / exercise?.totalTime) * 100 )}
            />
          </PlayLineContainer>
          <ExerciseDetailContainer>
            <ExerciseWrap>
              <Title level={4}>Reps</Title>
              <Title level={2}>{exercise?.currentExercise?.reps}</Title>
            </ExerciseWrap>
              <ExerciseWrap>
                <Title level={4}>Now</Title>
                <Title level={2}>{exercise?.currentExercise?.mainTitle}</Title>
              </ExerciseWrap>
          </ExerciseDetailContainer>
          {exercise?.currentExercise?.altTechnicalYtLink &&
            <ExerciseMod isExpand={exercise?.mod}>
              <ModImage>
                {exercise?.mod ? (
                  <iframe width="100%" height="240px" src={(`${exercise?.currentExercise?.altTechnicalYtLink}/?autoplay=1`).replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                )
                :
                <img src={(`${exercise?.currentExercise?.altImage}`)} />
                }
              </ModImage>
              <ModWrap>
                <Title level={4}>MOD</Title>
                <Title level={2}>{exercise?.currentExercise?.altTitle}</Title>
              </ModWrap>
            </ExerciseMod>
          }  
         </>
        : <Loading />
      }
    </MockContainer>
  )
}
export default memo(CockpitScreen)
