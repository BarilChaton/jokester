import { setLoggedIn } from '../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

import Logo from './HeroBar/Logo'

const Login = (props) => {
  const { darkMode } = props

  const [ bgColor, setBgColor ] = useState(darkMode ? 'darkModeSecondaryBg' : 'lightModeSecondaryBg')

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModePrimaryBg')
    } else {
      setBgColor('lightModePrimaryBg')
    }
  }, [darkMode])

  return (
    <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
      <div className={`w-[400px] h-[500px] ${bgColor} rounded-lg`}>
        <div className='justify-center items-center'>
          <Logo className='flex justify-center mt-4'/>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode
}), { setLoggedIn })(Login)