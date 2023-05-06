import React, { useState, useLayoutEffect } from 'react'
import reducer from '../redux/reducer'
import { connect } from 'react-redux'

import HeroBar from '../components/HeroBar/HeroBar'

const Home = (props) => {
  const { darkMode } = props

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
    </div>
  )
}

export const Reducer = reducer
export default connect(state => ({
  darkMode: state.darkMode
}))(Home)