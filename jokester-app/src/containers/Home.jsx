import { setUser, setLoggedIn, setSessionId } from '../redux/actions'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import reducer from '../redux/reducer'
import { connect } from 'react-redux'

import HeroBar from '../components/HeroBar/HeroBar'
import Login from '../components/Login'

const Home = (props) => {
  const { darkMode, loginModalOpen, dispatch } = props

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
  
      dispatch(setUser(newUser))
      dispatch(setSessionId('Usr_' + newUser._id))
      dispatch(setLoggedIn(true))
    } else {
      const newGuestId = Math.floor(Math.random() * 90000000000000000000) + 10000000000000000000;
      const guestId = newGuestId.toString();

      dispatch(setLoggedIn(false))
      dispatch(setSessionId('Gue_' + guestId))
    }
  
  }, [dispatch])

  return (
    <div className={`w-screen h-screen ${bgColor}`}>
      <div className='flex w-screen h-[65px] flex-initial'>
        <HeroBar {...props}/>
        {loginModalOpen && <Login {...props}/> }
      </div>
    </div>
  )
}

export const Reducer = reducer
export default connect(state => ({
  darkMode: state.darkMode,
  loginModalOpen: state.loginModalOpen,
  user: state.user
}), { setUser, setLoggedIn, setSessionId })(Home)