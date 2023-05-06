import { SET_DARK_MODE } from './constants'

export function setDarkMode(darkMode) {
  return {
    type: SET_DARK_MODE,
    darkMode
  }
}