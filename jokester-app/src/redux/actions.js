import { SET_DARK_MODE, SET_LOGGED_IN, SET_LOGIN_MODAL_OPEN } from './constants'

export function setDarkMode(darkMode) {
  return {
    type: SET_DARK_MODE,
    darkMode
  }
}
export function setLoggedIn(loggedIn) {
  return {
    type: SET_LOGGED_IN,
    loggedIn
  }
}
export function setLoginModal(loginModalOpen) {
  return {
    type: SET_LOGIN_MODAL_OPEN,
    loginModalOpen
  }
}