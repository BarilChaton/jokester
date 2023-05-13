import { setUser, setLoggedIn, setSessionId } from '../redux/actions'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import reducer from '../redux/reducer'
import { client } from '../client'
import { userQuery } from '../utils/data'
import { connect } from 'react-redux'

import HeroBar from '../components/HeroBar/HeroBar'
import Login from '../components/Login/Login'

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

    const userString = localStorage.getItem('user')

    if (userString && userString !== 'undefined') {
      const { name, id } = JSON.parse(userString)
      const query = userQuery(id)

      client.fetch(query).then((userData) => {
        const user = { ...userData, _id: id, userName: name };
        dispatch(setUser(user));
        dispatch(setSessionId(user._id));
        dispatch(setLoggedIn(true));
      }).catch((error) => {
        console.log('Error fetching user data from database:', error);
      })

    } else {
      const guestId = Math.floor(Math.random() * 90000000000000000000) + 10000000000000000000;
      dispatch(setLoggedIn(false));
      dispatch(setSessionId(guestId));
    }
  
  }, [ dispatch ])

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
  loginModalOpen: state.loginModalOpen
}), { setUser, setLoggedIn, setSessionId })(Home)