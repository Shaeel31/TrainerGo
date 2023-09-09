// @flow
import React, { memo, useEffect, useState } from 'react'
import {
  CheckBoxContainer,
  SearchContainer,
  VideosContainer,
  YoutubeContainer,
  YoutubeTitle,
  ViewMoreBtn
} from './styled'
import { YoutubeFilled } from '@ant-design/icons'
import Title from 'antd/lib/typography/Title'
import { YoutubeSearch } from './search'
import CheckPick from '../../../components/checkbox'
import { YouCard } from '../../../blocks/youtube-dnd/YoutubeCard'
import { fetchYoutubeApi } from '../../../store/workspace/actions'
import { useDispatch } from 'react-redux'
//
// const videos = require('./youtube.json')
// type Props = {}
const YoutubeWindow = ({ youtubeData, isDropped }) => {
  const [isChannel, setIsChannel] = useState(false)
  const [currentResults, setTCurrentResults] = useState(25)
  const dispatch = useDispatch()
  const onChange = (value) => {
    dispatch(
      fetchYoutubeApi({
        searchText: value,
        specificChannel: isChannel,
      })
    )
  }

  const onViewMore = (results) => {
    setTCurrentResults((currentResults + parseInt(results)))
    dispatch(
      fetchYoutubeApi({ maxResults: currentResults})
    )
  }

  const channelSelection = (e) => setIsChannel(e.target?.checked)

  useEffect( () => {
    if(!youtubeData)
    dispatch(fetchYoutubeApi({ searchText: '' }));
  }, [])
  
  return (
    <YoutubeContainer>
      <YoutubeTitle>
        <YoutubeFilled />
        <Title level={1}>YOUTUBE</Title>
      </YoutubeTitle>
      <SearchContainer>
        <YoutubeSearch onSearch={onChange} />
      </SearchContainer>
      <CheckBoxContainer>
        <CheckPick size="large" onChange={channelSelection}>
          Search in Trenergo channel
        </CheckPick>
      </CheckBoxContainer>
      <VideosContainer>
        {youtubeData?.map((_v, idx) => (
          <YouCard
            item={_v}
            type="youtube"
            isDropped={isDropped(_v)}
            key={idx}
          />
        ))}
        {youtubeData && <ViewMoreBtn type="primary" onClick={() => onViewMore(25)}>View more</ViewMoreBtn>}
      </VideosContainer>
    </YoutubeContainer>
  )
}
export default memo(YoutubeWindow)
