// @flow
import * as React from 'react'
import {
  CockpitScreenContainer,
  Picture,
  ScreenContainer,
  ScreensBlock,
  ScreensButtons,
  ScreenView,
  ScreenTitle,
  ScreenContent,
  GeneratedCode,
  NavigateTo,
  SaveButton
} from './styled'
import Title from 'antd/lib/typography/Title'
import Link from 'next/link'
import { memo, useEffect } from 'react'
import { createSession } from "./../../reduxServices/remoteServices"
import { useState } from 'react'
import { Spin } from 'antd'
import QRCode from 'qrcode.react'
import { useRouter } from 'next/router'


const SelectMode = (props) => {
  const router = useRouter()
  const workoutId = router.query.id
  console.log("props",router)
  let  first3Digit = Math.random().toString()
  let  second3Digit = (new Date()).getTime().toString()
  first3Digit = first3Digit.slice(first3Digit.length - 3)
  while(first3Digit[0]=='0'){
    first3Digit = Math.random().toString()
    first3Digit = first3Digit.slice(first3Digit.length - 3)
  }
  second3Digit = second3Digit.slice(second3Digit.length - 3)
  const code = first3Digit + second3Digit
  const [ digits, setDigits ] = useState("")
  const [ sessionMessage, setSessionMessage ] = useState(false)

  useEffect(() => {
    if(open) {
      createdSessionRes();
    }
    return () => {
      setSessionMessage(false)
    }
  }, [open])
 
  const createdSessionRes = async () => {
    setDigits(code);
    const sessionRes: any = await createSession(workoutId, parseInt(code));
    setSessionMessage(sessionRes)
  };

  return (
    <CockpitScreenContainer>
      <ScreenContainer>
        <ScreenTitle>You can control your workout and cockpit remotely!</ScreenTitle>
        <ScreenContent>
          <ScreensBlock>
            <ScreenView>
              <Title level={4}>Enter this code:</Title>
              <GeneratedCode>{sessionMessage ? (digits.slice(0,3)+'-'+digits.slice(3,6)) : <Spin tip="Loading..." />}</GeneratedCode>
              <NavigateTo>
                on 
                <Link href="/remote" >
                  <a target="_blank" >trenergo.com/remote</a>
                </Link>
              </NavigateTo>
            </ScreenView>
            <ScreenView background="#fff">
              <Title level={4}>or Scan this QR Code</Title>
              {sessionMessage ? 
              <QRCode className="qr-code" value={`https://trenergo.noderon.com/remote/${digits}`} />
              :
              <Spin tip="Loading..." />
              }
            </ScreenView>
          </ScreensBlock>
          <ScreensButtons
          >
            {sessionMessage ? (
              <>
              <Link href={`/remote/${digits}`}>
                <a target="_blank">
                  <SaveButton type="primary">Mobile Remote for web</SaveButton>
                </a>
              </Link>
              <Link href={{
                pathname: '/cockpit',
                query: { id: digits },
              }}>
              <a target="_blank">
                <SaveButton type="primary" >Continue to cockpit</SaveButton>
              </a>
            </Link>
              </>
            ) : (
              <>
                <SaveButton disabled type="primary">Mobile Remote for web</SaveButton>
                <SaveButton disabled type="primary">Continue to cockpit</SaveButton>
              </>
            )}
            <Link href='/builder'>
              <a>
                <SaveButton>Cancel</SaveButton>
              </a>
            </Link>
        </ScreensButtons>
        </ScreenContent>
      </ScreenContainer>
    </CockpitScreenContainer>
  )
}
export default memo(SelectMode)
