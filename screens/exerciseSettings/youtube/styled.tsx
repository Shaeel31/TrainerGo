import styled from 'styled-components'
import { Card, Button } from 'antd'

export const ViewMoreBtn = styled(Button)`
  margin:0 0 0 15px;
  grid-column: 1/auto;
`
export const YoutubeContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 24px;
  height: 100%;
`
export const YoutubeTitle = styled.div`
  display: flex;
  align-items: center;

  .ant-typography {
    margin: 0;
    font-weight: bolder;
  }

  .anticon {
    font-size: 2.7em;
    margin-right: 12px;
    color: red;
  }
`
export const SearchContainer = styled.div`
  width: 100%;
`
export const VideosContainer = styled.div`
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
`
export const Video = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;

  img {
    width: 100%;
    height: 100%;
  }

  :not(:last-of-type) {
    margin-bottom: 12px;
  }
`
export const CheckBoxContainer = styled.div``

export const VideoDescription = styled.div`
    display: flex;
    align-items: center;
    .ant-avatar {
       width:50px;
       height:50px;
       border-radius: 50%;
       overflow:hidden;
       img {
         width:100%;
         height:100%;
       }
    }
    a {
      color: inherit;
    }
`

export const YouTubeCardWindow = styled.div`
  //display: grid;
  //grid-template-rows: 1fr auto;
  //gap: 12px;
`
export const YouTubeCardPlayer = styled(Card)`
  //gap: 12px
  background-color: #1c1c1e;

  .ant-card-body {
    padding: 8px 0;
  }

  .ant-card-meta {
    //background-color: yellow;
    //display: flex;
    //align-items: center;

    .ant-card-meta-avatar {
      //background-color: red;
      //display: flex !important;
      //justify-content: center !important;
      //align-items: center !important;
      width: 50px;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }
`
export const VideosDetails = styled.div`
  background-color: red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
  padding: 8px;
`
