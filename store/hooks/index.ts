import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
import { rootReducer } from '../reducers'

const logger = createLogger({
  collapsed: true,
})

//Configuration object of persistant Store
const persistConfig = {
  key: 'root',
  storage,
  debug: true,
  timeout: null,
  stateReconciler: autoMergeLevel2,
  blacklist: ['_persist'],
  whitelist: ['users', 'workout'], // place to select which state you want to persist
}

//persistant store
const persistedReducer = persistReducer(persistConfig, rootReducer)

// middleWares of store
const middleWares = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleWares.push(logger)
}
const appInitialState = {} as any
export const makeStore = (initialState = appInitialState) => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(...middleWares),
  })
}
