import { setLoggedIn, setLoginModal, setUser, setSessionId } from '../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import Logo from './HeroBar/Logo'
import { client } from '../client'

const Login = (props) => {
  const { darkMode, dispatch } = props

  const [ bgColor, setBgColor ] = useState(darkMode ? 'darkModeSecondaryBg' : 'lightModeSecondaryBg')
  const [ xColor, setXColor ] = useState(darkMode ? 'darkModeSecondaryText' : 'lightModeSecondaryText')

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModePrimaryBg')
      setXColor('darkModeSecondaryText')
    } else {
      setBgColor('lightModePrimaryBg')
      setXColor('lightModeSecondaryText')
    }
  }, [darkMode])

  function handleCloseModal() {
    dispatch(setLoginModal(false))
  }

  const googleResponse = async (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))
    const { name, picture, sub } = decoded
    

    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(user)
      .then(() => {
        dispatch(setUser(user))
        dispatch(setSessionId('Usr_' + sub))
        dispatch(setLoggedIn(true))
        dispatch(setLoginModal(false))
      })
  }

  return (
    <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
      <div className={`w-[400px] h-[500px] p-5 ${bgColor} rounded-lg`}>
        <div className='flex justify-center items-center'>
          <div className='flex gap-14 ml-[85px] mt-[-10px] justify-center'>
            <Logo />
            <button 
              onClick={handleCloseModal}
              className={`justify-center items-center w-10 h-auto p-2 ${xColor} text-3xl rounded-full`}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        </div>
          <div className='flex justify-center mt-[8em] scale-150'>
            <GoogleLogin 
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              onSuccess={(response) => googleResponse(response)}
              onError={() => console.log('error')}
            />
          </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode
}), { setLoggedIn, setLoginModal, setUser, setSessionId })(Login)