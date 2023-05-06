import React, { useState, useLayoutEffect } from 'react'
import reducer from '../redux/reducer'
import { connect } from 'react-redux'

import HeroBar from '../components/HeroBar/HeroBar'
import Login from '../components/Login'

const Home = (props) => {
  const { darkMode, loginModalOpen } = props

  const [ bgColor, setBgColor ] = useState()

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModePrimaryBg')
    } else {
      setBgColor('lightModePrimaryBg')
    }

    return () => {
      setBgColor()
    }
  }, [ darkMode ])

  return (
    <div className={`w-screen h-screen ${bgColor}`}>
      <HeroBar {...props}/>
      {loginModalOpen && <Login {...props}/> }
    </div>
  )
}

export const Reducer = reducer
export default connect(state => ({
  darkMode: state.darkMode,
  loginModalOpen: state.loginModalOpen
}))(Home)