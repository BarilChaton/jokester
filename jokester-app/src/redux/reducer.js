import { SET_DARK_MODE } from './constants'

import createReducer from './createReducer'
import initialState from './initialState'

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DARK_MODE: {
      const { darkMode } = action
      return createReducer(state, {
        darkMode
      })
    }

    default: { return state }
  }
}