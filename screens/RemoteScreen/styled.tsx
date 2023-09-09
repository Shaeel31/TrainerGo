import styled from 'styled-components'
import { Button, Progress, Row } from 'antd'

export const Container = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 1280px;
  margin:0 auto;
`
export const CockpitContainer = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  gap: 12px;
  width: 100%;
  @media (max-width: 991px) and (orientation: portrait) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    grid-template-columns: 1fr auto 1fr;
  }
`
export const LeftScreen = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 24px;
  @media (max-width: 991px) {
    background-color: #1c1c1e;
    border-radius: 20px;
    position: relative;
    padding: 20px 10px 10px;
    display:grid;
    grid-template-columns: auto 1fr auto;
    align-items: end;
    justify-content: space-between;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    order:1;
    grid-row: 1/3;
    grid-template-rows:auto auto 1fr;
  }
  .ant-btn {
    &:last-child {
      @media (max-width: 991px) {
        border-radius: 4px 4px 20px 4px;
        order: 5;
      }
    }
    &:first-child {
      @media (max-width: 991px) {
        border-radius: 4px 4px 4px 20px;
        order: 3;
      }
    }
  }
`
export const RightScreen = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 24px;
  @media (max-width: 991px) {
    &>:first-child {
      display:block;
      padding: 20px 15px;
    }
    &>:nth-child(2) {
      display:flex;
    }
  }
  @media (max-width: 991px) and (orientation: landscape) {
    order: 3;
  }
`
export const MiddlePlayer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 130px 1fr 60px;
  gap: 24px;
  @media (max-width: 991px) {
    display:contents;
  }
`
export const PlayerBox = styled.div`
  height: 100%;
  padding: 8px;
  border-radius: 20px;
  background-color: #1c1c1e;
  @media (max-width: 991px) {
    background-color: transparent;
    order: -1;
    display: grid;
    grid-template-columns:1fr auto;
    align-items: center;
    grid-gap:12px;
    &>:first-child {
      display:none;
    }
    .ant-typography {
      order: 1;
      margin:0;
    }
  }
  @media (max-width: 991px) and (orientation: landscape) {
    order: 2;
    grid-template-columns: auto;
    padding:15px 0 0;
    grid-template-rows: auto 1fr;
    grid-row: 1/3;
    .ant-typography {
      order: 0;
      font-size: 20px !important;
    }
  }
`
export const PlayerControls = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 10px;
  @media (max-width: 991px) {
    order:1;
    grid-template-columns:auto auto auto auto auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    order: 4;
    grid-column: 3/5;
  }
`

export const InsidePlayer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  height: 100%;
  gap: 8px;
  justify-content: center;
  align-items: center;
`

export const FBButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 12px;
`
export const PlayerActionBtn: any = styled(Button)`
  border: none;
  width: 100%;
  height: auto;
  img {
    width: 100%;
  }
`
export const ControlBtn: any = styled(Button)`
  width: auto;
  border: none;

  img {
    height: 100%;
    width: 100%;
  }
`
export const PlayBarLine: any = styled(Progress)`
  @media (max-width: 991px) and (orientation: landscape) {
    height:100%;
  }  
  .ant-progress-bg {
    height: ${(props: any) => props?.orient ? props?.percent+ "%" : "20px"} !important;
    width: ${(props: any) => props?.orient ? "100%" : props?.percent+ "%"} !important;
    position: relative;
    z-index: 1;
  }
  .ant-progress-inner{
    background-color: #000000;
    @media (max-width: 991px) {
      background-color: #1c1c1e;
      height:100%;
    }
  }
  .ant-progress-outer {
    padding: 0;
    @media (max-width: 991px) and (orientation: landscape) {
      height:100%;
      width:50%;
      margin:0 auto;
      display:block;
    }
  }
`
export const TotalTime = styled.div`
  text-align: center;
`
export const ScreenBox = styled.div`
  padding: 20px 40px;
  border-radius: 20px;
  background-color: #1c1c1e;
  height: 100%;
  display: grid;
  grid-template-rows: 30px auto auto;
  justify-content: center;
  position: relative;
  grid-template-columns: 1fr;
  @media (max-width: 991px) {
    display:contents;
  }
`
export const BottomButtons = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    display: contents;
  }
`
export const BottomActions = styled.div`
  align-self: flex-end;
  text-align: center;
  h1.ant-typography {
    font-size: 56px;
    line-height:1.4;
    margin:0;
    font-weight: 600;
    color: #ffffff;
    @media (max-width: 991px) {
      font-size: 42px;
    }
  }
  @media (max-width: 991px) {
    order:4;
  }
`
export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 180px auto;
  gap: 12px;
  position: absolute;
  left: 12px;
`
export const Video = styled.div`
  border-right: 50px;
  overflow: hidden;

  img {
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
`
export const Description = styled.div`
  max-width: 80%;
  text-align: left;
  h1.ant-typography {
    font-size: 2.3em;
    font-weight: normal;
  }
`
export const ExerciseTime = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
  h2.ant-typography {
    font-size: 16px;
    text-align: left;
    margin: 0;
    @media (max-width: 991px) {
      text-align: center;
    }
    &:nth-child(2) {
      text-align:center;
      border-right: 1px solid #6D6D6D;
      border-left: 1px solid #6D6D6D;
      @media (max-width: 991px) {
        display:none
      }
    }
    &:last-child {
      text-align:right;
      @media (max-width: 991px) {
        display:none
      }
    }
    b {
      font-size: 22px;
    }
  }
`
export const ArrowButton = styled(Button)`
  border: 2px solid #6D6D6D;
  height: 61px !important;
  width: 61px !important;
`

export const ExerciseCarousal = styled.div`
  width: 26vw;
  max-width:360px;
  .ant-carousel {
    width:100% !important;
  }
  .slick-dots{
    display: none !important;
  }
  .ant-carousel .slick-track{
    display: flex !important;
  }
  .ant-carousel .slick-list {
    width:100% !important;
  }

  
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 60px;
    height: 60px;
    margin-top: -30px;
    border-radius: 50%;
    z-index:2;
  }

  .ant-carousel .slick-prev {
    left: -75px;
  }
   
  .ant-carousel .slick-next {
    right: -75px;
  }
  @media (max-width: 991px) and (orientation: portrait) {
    width: 60vw;
    margin: 0 auto;
  }
`

export const NextExercise = styled.div`
  width: 100%;
  height: 61px;
  border-radius: 58px;
  border: 2px solid #6d6d6d;
  display: flex !important;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: #ffffff;
  @media (max-width: 991px) and (orientation: portrait) {
    width:100%;
    order:3;
  }
`
export const LeftButton = styled(Button)`
  width: 160px;
  border-radius: 58px;
  border: 2px solid #6D6D6D;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding:0 6px;
  gap: 10px;
  height:60px;
  @media (max-width: 991px) {
    grid-template-columns: auto;
    background-color: #000000;
    height: 85px;
    width: 80px;
    padding: 8px;
  }
  img {
    width:42px;
    @media (max-width: 991px) {
      width:32px;
      margin:0 auto;
    }
  }
  span {
    font-size: 20px;
    font-weight: normal;
    color: #ffffff;
    @media (max-width: 991px) {
      font-size: 14px;
    }
  }
`
export const TopText = styled.div`
  text-align: center;
  color:#6D6D6D;
  cursor:pointer;
  @media (max-width: 991px) {
    grid-column: 1/4;
    order:1;
  }
`
export const MainTitle = styled.div`
  text-align: center;
  h1.ant-typography {
    font-size: 4em;
    font-weight: 600;
    color: #ffffff;
    line-height:1.2;
  }
  @media (max-width: 991px) {
    grid-column: 1/4;
    order:2;
    padding:0 20px;
  }
`
