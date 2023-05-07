import { setUser, setLoggedIn } from '../redux/actions'
import React, { useState, useLayoutEffect, useEffect } from 'react'
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

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    
    if(User) {
      const { name, picture, sub } = User
  
      const newUser = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
      }
  
      props.setUser(newUser)
      props.setLoggedIn(true)
    } else {
      props.setLoggedIn(false)
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  loginModalOpen: state.loginModalOpen,
  user: state.user
}), { setUser, setLoggedIn })(Home)