import { SET_DARK_MODE, SET_LOGGED_IN, SET_LOGIN_MODAL_OPEN, SET_USER, SET_SESSION_ID, SET_DROP_DOWN_MENU,
  SET_PROFILE_WINDOW } from './constants'

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
export function setSessionId(sessionId) {
  return {
    type: SET_SESSION_ID,
    sessionId
  }
}
export function setUserDropDownMenu(userDropDownMenu) {
  return {
    type: SET_DROP_DOWN_MENU,
    userDropDownMenu
  }
}
export function setProfileWindow(profileWindow) {
  return {
    type: SET_PROFILE_WINDOW,
    profileWindow
  }
}