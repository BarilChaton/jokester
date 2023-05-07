import { setLoginModal } from '../../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

import { FaRegUser } from 'react-icons/fa'

const LoginButton = (props) => {
  const { darkMode, loggedIn, user, dispatch } = props
  console.log(props);


  const [ extend, setExtend ] = useState(false)
  const [ buttonText, setButtonText ] = useState()
  const [ color, setColor ] = useState()
  const [ textColor, setTextColor ] = useState()

  useLayoutEffect(() => {
    const handleHover = () => {
      if(!loggedIn) {
        extendButton().then(() => {
          setButtonText('Sign In')
        })
      } else {
        extendButton().then(() => {
          const newUserName = user.userName.split(' ')
          setButtonText(newUserName[0])
        })
      }
    }

    const handleLeave = () => {
      if(!loggedIn) {
        returnButton().then(() => {
          setButtonText('')
        })
      } else {
        returnButton().then(() => {
          setButtonText('')
        })
      }
    }

    const signUpButton = document.querySelector(".sign-up-button")
        signUpButton.addEventListener("mouseenter", handleHover)
        signUpButton.addEventListener("mouseleave", handleLeave)

        return () => {
            signUpButton.removeEventListener("mouseenter", handleHover)
            signUpButton.removeEventListener("mouseleave", handleLeave)
        }
  }, [loggedIn, user])

  useLayoutEffect(() => {
    if (darkMode) {
      setColor('darkModePrimaryBg')
      setTextColor('darkModePrimaryText')
    } else {
      setColor('lightModePrimaryBg')
      setTextColor('lightModePrimaryText')
    }
  }, [ darkMode ])

  const extendButton = () => {
    setExtend(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  }

  const returnButton = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
          setExtend(false)
          resolve()
        }, 300)
      })
    }

  function handleClick() {
    if (!loggedIn) {
      dispatch(setLoginModal(true))
    } 
  }

  return (
    <div className={`w-[200px] flex justify-end h-auto my-[2px] px-2 ${textColor} font-bold text-[17px]`}>
      <button onClick={handleClick} className={`
        flex 
        flex-row 
        h-[55px] 
        items-center 
        justify-end 
        ${color}
        rounded-full
        sign-up-button
        p-0 
        m-3
        transition-width 
        SignUpEasing 
        duration-SignUpTransTime 
        ${extend ? "w-SignUpExtend" : "w-SignUpNormal"}
        `}>
          <h3 className={`flex justify-center items-center m-auto transition-opacity duration-SignUpTransTime ${extend ? "opacity-1" : "opacity-0"}`}>
            {buttonText}
          </h3>
          {!loggedIn ? <FaRegUser className='w-[35px] h-[35px] m-[10px]'/> : 
          <img src={user.image} alt="user" className='w-[40px] h-[40px] m-[7px] rounded-full' />}
      </button>      
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  loggedIn: state.loggedIn,
  user: state.user
}), { setLoginModal })(LoginButton)