import * as React from 'react'
import { memo, useState } from 'react'
import { Container, Logo, StartButton, CodeTitle, CodeInput } from './styled'
import dynamic from 'next/dynamic';
import Link from 'next/link';
const ReactCodeInput = dynamic(import('react-code-input'));

const RemoteCode: any = (props) => {
  const [state,setState] = useState<{
    code: any
  }>({
    code: 0,
  })

  const handelCode = (value) => {
    setState({code: value})
  }


  return (
    <Container>
        <Logo>
          <img src="/text-logo.svg" alt="" />
        </Logo>
        <CodeTitle>Enter Code:</CodeTitle>
        <CodeInput>
            <ReactCodeInput value={state.code} onChange={handelCode} type='number' fields={6} {...props}/>
        </CodeInput>
        <Link href={`/remote/${state.code}`}>
          <a>
          <StartButton type="primary">Start</StartButton>
          </a>
        </Link>
    </Container>
  )
}

export default memo(RemoteCode)
