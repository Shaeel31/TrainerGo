// @flow
import * as React from 'react'
import {
  ForgotContainer,
  SocialButtons,
  SocialContainer,
  SocialText,
} from './style'
import { Social } from '../../components/socialButton'
import Paragraph from 'antd/lib/typography/Paragraph'
import Link from 'next/link'
import { FC } from 'react'

export const SocialLogins: FC<any> = () => {
  const socials = ['facebook', 'google', 'apple'].map((item, idx) => (
    <Social key={idx} icon={<img src={`${item}.svg`} alt={item} />} />
  ))
  return (
    <SocialContainer>
      <ForgotContainer>
        <Link href="">
          <a>Forgot your password?</a>
        </Link>
      </ForgotContainer>
      <SocialText>
        <Paragraph>
          <b>OR</b> log in with:
        </Paragraph>
      </SocialText>
      <SocialButtons>{socials}</SocialButtons>
    </SocialContainer>
  )
}
