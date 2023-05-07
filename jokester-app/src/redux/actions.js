import { SET_DARK_MODE, SET_LOGGED_IN, SET_LOGIN_MODAL_OPEN, SET_USER } from './constants'

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
export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}