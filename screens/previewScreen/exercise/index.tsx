// @flow
import React, { Fragment } from 'react'
import {
  ExRestContainer,
  MainTitle,
  PrevContainer,
  PreviewExContainer,
  RepsContainer,
  SubDetail,
  TimeBox,
} from './styled'
import Title from 'antd/lib/typography/Title'

// type Props = {}
export const PreviewExercises = ({ exercises }) => {
  const onExercise = (exercise, idx) => {
    console.log('HAHHHAHA',exercise)
    return (
      <Fragment>

        {exercise.type === 1 ? (
          <PreviewExContainer key={exercise?.id}>
          <MainTitle>
            <SubDetail content="main:">
              <Title level={4}>{exercise?.mainTitle}</Title>
            </SubDetail>
            <SubDetail content="mod:">
              <Title level={4}>{exercise?.altTitle}</Title>
            </SubDetail>
          </MainTitle>
          <RepsContainer>
            <b>{exercise?.reps}</b>
          </RepsContainer>
          <TimeBox>
            <b>{exercise?.duration}</b>
          </TimeBox>
        </PreviewExContainer>
        ):(
          <ExRestContainer key={idx}>
            <Title level={4}>{exercise?.mainTitle}</Title>
            <div />
            <TimeBox>
              <b>{exercise?.duration}</b>
            </TimeBox>
          </ExRestContainer>
        )}

        
      </Fragment>
    )
  }
  return (
    <PrevContainer>
      {exercises?.map((exercise, idx) => onExercise(exercise, idx))}
    </PrevContainer>
  )
}
