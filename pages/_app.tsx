import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { useStore } from '../store'
import { theme } from '../assets/varibales'
import GlobalStyle from '../assets/global'
import Loading from '../blocks/loading'

type Props = {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Props): any {
  const store = useStore(pageProps?.initialReduxState)
  const _persist = persistStore(store, {}, () => {
    _persist.persist()
  })

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentNode?.removeChild(jssStyles)
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={_persist}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
