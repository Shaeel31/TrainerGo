import React, { memo } from 'react'
import {
  BlockRestSection,
  BlockSection,
  BlockTitle,
  HeaderTop,
  Preview,
  PreviewContainer,
  TopButton,
  VideoInstructions,
  WorkoutDetails,
} from './styled'
import Title from 'antd/lib/typography/Title'
import { PreviewExercises } from './exercise'
import { Videos } from './videos'
import { useRouter } from 'next/router'

const PreviewScreen = ({ visible, onCancel, activeWorkout }) => {
  // const { workout } = props
  const router = useRouter()
  const printPage = (element) => {
    const printContents = document.getElementById(element).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    router.reload('/builder')
    // onCancel()
}
  const onBlocks = (block, idx) => {
    const _block =
      block.type === 1 ? (
        <BlockSection>
          <BlockTitle>
            {idx + 1}. {block?.title}
          </BlockTitle>
          <PreviewExercises exercises={block?.exercises} />
        </BlockSection>
      ) : (
        <BlockRestSection>
          <Title level={3}>{block?.title}</Title>
          <p>{block?.duration}</p>
        </BlockRestSection>
      )
    return <WorkoutDetails key={idx}>{_block}</WorkoutDetails>
  }

  return (
        <PreviewContainer 
        >
      <style>
        {`@media only print {
   .ant-modal-body {
     width: auto;
     height: auto;
     overflow: visible;
   }
}`}
      </style>
      <Preview
        title={
          <HeaderTop>
            <TopButton type="primary" shape="round">
              Videos
            </TopButton>
            <TopButton
              type="primary"
              shape="round"
              onClick={() => printPage('printPage')}
              // onClick={() => window.print()}
            >
              Print
            </TopButton>
          </HeaderTop>
        }
        visible={visible}
        footer={null}
        onCancel={onCancel}
      >
        <div id="printPage">
        <Title level={1} style={{ textAlign: 'center', color: '#121214' }}>
          {activeWorkout?.title}
        </Title>
        {activeWorkout?.blocks?.map((block, idx) => onBlocks(block, idx))}

        <Title
          level={1}
          style={{
            textAlign: 'center',
            color: '#121214',
            padding: '24px 0',
            margin: 0,
          }}
        >
          Videos & Instructions
        </Title>
        
        <VideoInstructions>
          {activeWorkout?.blocks?.map((block) => {
            return block.exercises?.map((ex, ix) => (
              <Videos key={ix} exercise={ex} />
            ))
          })}

          {/*<Videos/>*/}
          {/*<Videos/>*/}
        </VideoInstructions>

      </div>
      </Preview>
    </PreviewContainer>
  )
}
export default memo(PreviewScreen)
