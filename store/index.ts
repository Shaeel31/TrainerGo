import { useMemo } from 'react'
import { makeStore } from './hooks'
import { RootState } from './reducers'

let store = null

const initStore: any = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store
  return _store
}

export function useStore(initialState: RootState): any {
  const store = useMemo(() => initStore(initialState), [initialState])
  return store
}
