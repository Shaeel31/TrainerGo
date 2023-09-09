import * as React from 'react'

import {
  SectionCol,
  SectionRow,
  Thumbnail,
  WorkoutSettingContainer,
} from './styled'
import FullModal from '../ModelFullView'
import Paragraph from 'antd/lib/typography/Paragraph'
import Colors from '../GeneralCard/colors'
import GeneralCard from '../GeneralCard'
import Sounds from '../GeneralCard/sounds'
import Counter from '../../components/counter'
import ImageUpload from '../../components/imageUpload'

// type Props = {};
const sounds = [
  { id: 1, title: 'Beep' },
  { id: 2, title: 'Tri-tone' },
  { id: 3, title: 'Chord' },
  { id: 4, title: 'Ring' },
  { id: 5, title: 'Keys' },
]

const colors = [
  { id: 1, title: 'oval', color: '#c95d03' },
  { id: 2, title: 'red', color: '#de1c00' },
  { id: 3, title: 'pink', color: '#d3064f' },
  { id: 4, title: 'purple', color: '#5b2478' },
  { id: 5, title: 'yellow', color: '#c69003' },
  { id: 6, title: 'green', color: '#127e00' },
  { id: 7, title: 'seagreen', color: '#03c05f' },
  { id: 8, title: 'lightblue', color: '#037bbe' },
  { id: 9, title: 'blue', color: '#1527b5' },
  { id: 10, title: 'black', color: '#343434' },
]

export const WorkoutSettings = ({
  data,
  visible,
  current,
  onOpen,
  onOk,
  loading,
  onChange,
  handleImage,
}) => {
  return (
    <WorkoutSettingContainer>
      <FullModal visible={visible} onChange={onOpen} onOk={onOk}>
        <SectionRow>
          <SectionCol>
            <GeneralCard title="EXERCISE">
              <Sounds
                id="exerciseSoundId"
                value={
                  data?.exerciseSoundId
                    ? data?.exerciseSoundId
                    : current?.exerciseSoundId
                }
                onChange={onChange}
                sounds={sounds}
              />
              <Colors
                id="exerciseColorId"
                value={
                  data?.exerciseColorId
                    ? data?.exerciseColorId
                    : current?.exerciseColorId
                }
                onChange={onChange}
                colors={colors}
              />
            </GeneralCard>
          </SectionCol>
          <SectionCol awehi={current}>
            <GeneralCard title="REST">
              <Sounds
                id="restSoundId"
                value={
                  data?.restSoundId ? data?.restSoundId : current?.restSoundId
                }
                onChange={onChange}
                sounds={sounds}
              />
              <Colors
                id="restColorId"
                value={
                  data?.restColorId ? data?.restColorId : current?.restColorId
                }
                onChange={onChange}
                colors={colors}
              />
            </GeneralCard>
          </SectionCol>
          <SectionCol>
            <GeneralCard title="VOLUME">
              <Paragraph>Set the volume for all sounds</Paragraph>
              <Counter
                max={100}
                rounds={data?.volume ? data?.volume : current?.volume}
                style={{ maxWidth: 90 }}
                onChange={(e) => {
                  onChange({ target: { id: 'volume', value: e } })
                }}
              />
            </GeneralCard>
            <GeneralCard title="PREPARATION TIME">
              <Paragraph>Time before workout starts </Paragraph>
              <Counter
                max={60}
                rounds={
                  data?.preparationTime
                    ? data?.preparationTime
                    : current?.preparationTime
                }
                style={{ maxWidth: 90 }}
                onChange={(e) => {
                  onChange({ target: { id: 'preparationTime', value: e } })
                }}
              />
            </GeneralCard>
            <GeneralCard title="TICKS">
              <Paragraph>
                Set warning ticks that announce interval change{' '}
              </Paragraph>
              <Counter
                max={10}
                rounds={data?.ticks ? data?.ticks : current?.ticks}
                style={{ maxWidth: 90 }}
                onChange={(e) => {
                  onChange({ target: { id: 'ticks', value: e } })
                }}
              />
            </GeneralCard>
          </SectionCol>
          <SectionCol>
            <GeneralCard style={{ maxheight: 250 }} title="WORKOUT THUMBNAIL">
              <Paragraph>JPG or PNG / 16:9 ratio</Paragraph>
              <Thumbnail>
                <ImageUpload
                  imageUrl={data?.image ? data?.image : current?.image}
                  loading={loading}
                  handleChange={handleImage}
                  isCancel={false}
                  onCancel
                />
              </Thumbnail>
            </GeneralCard>
          </SectionCol>
        </SectionRow>

        {/*<SectionRow gutter={[24, 24]}>*/}
        {/*  <SectionCol sm={5}>*/}
        {/*    <GeneralCard title="EXERCISE">*/}
        {/*      <Sounds sounds={sounds}/>*/}
        {/*      <Colors colors={colors}/>*/}
        {/*    </GeneralCard>*/}
        {/*  </SectionCol>*/}
        {/*  <SectionCol sm={5}>*/}
        {/*    <GeneralCard title="REST">*/}
        {/*      <Sounds sounds={sounds}/>*/}
        {/*      <Colors colors={colors}/>*/}
        {/*    </GeneralCard>*/}
        {/*  </SectionCol>*/}
        {/*  <SectionCol sm={9}>*/}
        {/*    <SectionRow gutter={[24, 24]}>*/}
        {/*      <SectionCol sm={24}>*/}
        {/*        <GeneralCard title="VOLUME"/>*/}
        {/*      </SectionCol>*/}
        {/*      <SectionCol sm={24}>*/}
        {/*        <GeneralCard title="VOLUME"/>*/}
        {/*      </SectionCol>*/}
        {/*      <SectionCol sm={24}>*/}
        {/*        <GeneralCard title="VOLUME"/>*/}
        {/*      </SectionCol>*/}
        {/*    </SectionRow>*/}
        {/*  </SectionCol>*/}
        {/*  <SectionCol sm={5}>*/}
        {/*    <GeneralCard title="WORKOUT THUMBNAIL"/>*/}
        {/*  </SectionCol>*/}
        {/*</SectionRow>*/}
      </FullModal>
    </WorkoutSettingContainer>
  )
}
