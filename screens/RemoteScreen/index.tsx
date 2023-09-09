// @flow
import Title from 'antd/lib/typography/Title'
import * as React from 'react'
import { memo, useState, useEffect } from 'react'
import { Carousel } from 'antd';
import {
  ArrowButton,
  BottomActions,
  BottomButtons,
  CockpitContainer,
  Container,
  ExerciseCarousal,
  Description,
  ExerciseTime,
  FBButtons,
  InsidePlayer,
  LeftButton,
  LeftScreen,
  MainTitle,
  MiddlePlayer,
  NextExercise,
  PlayBarLine,
  PlayerBox,
  RightScreen,
  ScreenBox,
  TopText,
  PlayerControls,
  PlayerActionBtn,
} from './styled'
import Loading from "./../../blocks/loading"
import { 
  playSession, 
  pauseSession,
  addTime,
  blockChange,
  changeMod,
  resetTime,
  getSession
 } from './../../reduxServices/remoteServices'
import moment from "moment"



// type Props = {}
const RemoteScreen = ({
  exercise,
  code
}) => {

  const [state,setState] = useState<{
    isOrient: Boolean,
    isPlay: Boolean
  }>({
    isOrient: false,
    isPlay: exercise?.play,
  })

  useEffect(() => {
    window.addEventListener("orientationchange", function(event) {
      if(event.target.screen.orientation.angle == 90) {
        setState({ ...state, isOrient: true })
      }else {
        setState({ ...state, isOrient: false })
      }
    })
  }, [exercise])


  const handleNext = () => {
    // dispatch(nextExercise())
  }

  const onChange = (index) => {
    const id: any = exercise?.blocks[index] ? exercise?.blocks[index]['id'] : false
    if(id) blockChange(code,id)
  }

  return (
    <Container>
      {exercise?.currentExercise?.mainTitle ? (
        <CockpitContainer>
          <LeftScreen>
            <ScreenBox>
              <TopText onClick={() => getSession('now')}>now</TopText>
              <MainTitle>
                <Title level={1}>{exercise?.currentExercise?.mainTitle}</Title>
              </MainTitle>
              <BottomActions>
                <RepTime exerciseTimer={exercise?.currentExerciseTime - exercise?.consumedExerciseTime} />
                <ExerciseTime>
                  <TotalReps
                    exerciseReps={exercise?.currentExercise?.reps}
                  />
                  <TotalExercises
                    currentExercise={exercise?.currentExerciseNumber}
                    total={exercise?.totalExercisesInBlock}
                  />
                  <TotalRound
                    rounds={exercise?.currentRoundNumber}
                    total={exercise?.rounds}
                  />
                </ExerciseTime>
              </BottomActions>
            </ScreenBox>
            <BottomButtons>
              <LeftButton
                onClick={() => resetTime(code)}
                icon={<img src="/icons/rest.svg" alt="" />}
              >
                RESET
              </LeftButton>
              <LeftButton onClick={() => addTime(code)} icon={<img src="/icons/secs.svg" alt="" />} >
                +15 sec
              </LeftButton>
            </BottomButtons>
          </LeftScreen>
          <MiddlePlayer>
            {exercise.totalTime && <TotalTimeBox isOrient={state.isOrient} totalTime={exercise.totalTime} consumeTime={exercise.consumedTime} />}
            <PlayerControls>
              {(exercise?.play) ?
              <PlayerActionBtn
                icon={<img src="/icons/pause.svg" alt="pause" />}
                onClick={() => pauseSession(code)}
              />
              :
              <PlayerActionBtn
                icon={<img src="/icons/play.svg" alt="play" />}
                onClick={() => playSession(code)}
              /> 
              }
              <PlayerActionBtn
                icon={<img src="/icons/person.svg" alt="pause" />}
              />
              <PlayerActionBtn
                icon={<img src="/icons/mod.svg" alt="pause" />}
                onClick={() => changeMod(code, !exercise?.mod)}
              />
              <PlayerActionBtn
                icon={<img src="/icons/close-view.svg" alt="pause" />}
              />
              <PlayerActionBtn
                icon={<img src="/icons/expand-view.svg" alt="pause" />}
              />
            </PlayerControls>
          </MiddlePlayer>
          <RightScreen>
            <ScreenBox>
              <TopText onClick={() => getSession('next')}>next</TopText>
              <MainTitle>
                <Title level={1}>{exercise?.nextExercise?.mainTitle}</Title>
              </MainTitle>
            </ScreenBox>
            <BottomButtons>
              <ArrowButton
                size="large"
                shape="circle"
                icon={<img src="/icons/r-arrow.svg" alt="" />}
              />
              <ExerciseCarousal> 
                <Carousel arrows={true} infinite={false} afterChange={onChange}>
                  {exercise?.blocks ?
                    exercise.blocks.map( block => <NextExercise>{block?.title}</NextExercise> )
                  :
                  <NextExercise>finished</NextExercise>
                  }
                </Carousel>
              </ExerciseCarousal>  
              <ArrowButton
                size="large"
                shape="circle"
                icon={<img src="/icons/l-arrow.svg" alt="" />}
              />
            </BottomButtons>
          </RightScreen>
        </CockpitContainer>
      ) : <Loading />}
    </Container>
  )
}

const TotalTimeBox = ({ totalTime, consumeTime, isOrient }) => {
  const [state, setState] = useState<{
    percent: number,
  }>({
    percent: 0,
  })

  useEffect(() => {
    const percent = (((consumeTime)/totalTime) * 100)
    setState({ percent })
    console.log("percent",consumeTime,totalTime, moment(consumeTime).format('mm:ss'));
  }, [consumeTime])

  return (
    <PlayerBox>
      <TopText>total time</TopText>
      <Title
        style={{
          textAlign: 'center',
          color: '#ffffff',
          fontSize: '2.3em',
        }}
        level={1}
      >
        {moment.utc((totalTime - consumeTime)*1000).format('mm:ss')}
      </Title>
      <PlayBarLine
        count={50}
        orient={isOrient}
        percent={state.percent}
        size="small"
        type="line"
        format={() => null}
        strokeColor="#ffffff"
        strokeWidth={80}
        width={100}
        strokeLinecap="round"
        showInfo={true}
      />
    </PlayerBox>
  )
}

const TotalReps = ({ exerciseReps }) => {
  return (
    <Title level={2}>
      Reps: <b>{`${exerciseReps}`}</b>
    </Title>
  )
}

const TotalRound = ({ rounds, total }) => {
  return (
    <Title level={2}>
      R: <b>{`${total}`}</b>
    </Title>
  )
}

const TotalExercises = ({ currentExercise, total }) => {
  return (
    <Title level={2}>
      E: <b>{`${currentExercise}/${total}`}</b>
    </Title>
  )
}


const RepTime = ({ exerciseTimer }) => {
  return <Title level={1}>{moment.utc((exerciseTimer)*1000).format('mm:ss')}</Title>
}
export default memo(RemoteScreen)
