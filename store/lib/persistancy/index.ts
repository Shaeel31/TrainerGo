//Configuration object of persistant Store
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { rootReducer } from '../../reducers'

const persistConfig = {
  key: 'root',
  version: 0,
  storage,
  debug: true,
  timeout: null,
  stateReconciler: autoMergeLevel2,
  blacklist: ['_persist'],
  whitelist: ['cockpit'], // place to select which state you want to persist
}

//persistant store
export default persistReducer(persistConfig, rootReducer)
