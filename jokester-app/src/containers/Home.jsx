import React, { useState, useLayoutEffect } from 'react'
import reducer from '../redux/reducer'
import { connect } from 'react-redux'

import HeroBar from '../components/HeroBar'

const Home = (props) => {
  const { darkMode } = props
  console.log(darkMode);

  const [ bgColor, setBgColor ] = useState('darkModePrimaryBg')

  useLayoutEffect(() => {
    console.log(darkMode);
    if (darkMode) {
      setBgColor('darkModePrimaryBg')
    } else {
      setBgColor('lightModePrimaryBg')
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