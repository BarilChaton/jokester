import { setUser, setLoggedIn, setSessionId, setDarkMode } from '../redux/actions'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import reducer from '../redux/reducer'
import { client } from '../client'
import { userQuery } from '../utils/data'
import { connect } from 'react-redux'

import TopBar from '../components/NavBar/topBar'
import Login from '../components/Login/Login'
import UserMenu from '../components/UserMenu/userMenu'

const Home = (props) => {
  const { darkMode, loginModalOpen, userDropDownMenu, dispatch } = props

  const [ bgColor, setBgColor ] = useState()
  const [ dropMenu, setDropMenu ] = useState()

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

  useLayoutEffect(() => {
    if (userDropDownMenu) {
      setDropMenu('top-[65px]')
    } else {
      setDropMenu('top-[-500px]')
    }
  }, [ userDropDownMenu ])

  useEffect(() => {

    const userString = localStorage.getItem('user')

    if (userString && userString !== 'undefined') {
      console.log(userString);
      const isGoogle = userString.includes('google')

      const { name, id, sub } = JSON.parse(userString)
      const idCheck = isGoogle ? sub : id
      const query = userQuery(idCheck)

      client.fetch(query).then((userData) => {
        const fetchedUser = { ...userData, _id: idCheck, userName: name }
        dispatch(setUser(fetchedUser));
        dispatch(setSessionId(fetchedUser._id));
        dispatch(setDarkMode(fetchedUser[0].settings.darkmode))
        dispatch(setLoggedIn(true));
      })

    } else {
      const guestId = Math.floor(Math.random() * 90000000000000000000) + 10000000000000000000;
      dispatch(setLoggedIn(false));
      dispatch(setSessionId(guestId));
    }

  }, [ dispatch ])

  return (
    <div className={`w-screen h-screen ${bgColor}`}>
      <div className={`flex absolute justify-end smooth-transition right-[110px] ${dropMenu} z-9`}>
        <UserMenu {...props}/>
      </div>
      <div className='flex w-screen h-[65px] flex-initial z-10'>
        <TopBar {...props}/>
        {loginModalOpen && <Login {...props}/> }
      </div>
    </div>
  )
}

export const Reducer = reducer
export default connect(state => ({
  darkMode: state.darkMode,
  loggedIn: state.loggedIn,
  loginModalOpen: state.loginModalOpen,
  userDropDownMenu: state.userDropDownMenu
}), { setUser, setLoggedIn, setSessionId, setDarkMode })(Home)