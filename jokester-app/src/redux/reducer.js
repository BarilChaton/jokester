import { SET_DARK_MODE, SET_LOGGED_IN, SET_LOGIN_MODAL_OPEN, SET_USER, SET_SESSION_ID } from './constants'

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
    case SET_LOGGED_IN: {
      const { loggedIn } = action
      return createReducer(state, {
        loggedIn
      })
    }
    case SET_LOGIN_MODAL_OPEN: {
      const { loginModalOpen } = action
      return createReducer(state, {
        loginModalOpen
      })
    }
    case SET_USER: {
      const { user } = action
      return createReducer(state, {
        user
      })
    }
    case SET_SESSION_ID: {
      const { sessionId } = action
      return createReducer(state, {
        sessionId
      })
    }

    default: { return state }
  }
}