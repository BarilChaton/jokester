import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducer'

const store = configureStore({
  reducer: appReducer
})

export default store