import { setLoginModal } from '../../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

import { FaRegUser } from 'react-icons/fa'

const LoginButton = (props) => {
  const { loggedIn, user } = props

  const [ extend, setExtend ] = useState(false)
  const [ buttonText, setButtonText ] = useState()

  useLayoutEffect(() => {
    const handleHover = () => {
      if(!loggedIn) {
        extendButton().then(() => {
          setButtonText('Sign in/Sign up')
        })
      } else {
        extendButton().then(() => {
          setButtonText(user.name)
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

  const extendButton = () => {
    setExtend(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  }

  const returnButton = () => {
      setExtend(false)
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve()
          }, 300)
      })
    }

  function handleClick() {
    if (!loggedIn) {
      props.setLoginModal(true)
    } 
  }

  return (
    <div className='w-[15vw] flex justify-end h-auto my-[2px] px-2 text-white font-bold text-lg'>
      <button onClick={handleClick} className={`
        flex 
        flex-row 
        h-[40px] 
        items-center 
        justify-center 
        bg-blue-400 
        text-white 
        rounded-full
        sign-up-button
        p-0 
        m-3 
        transition-width 
        SignUpEasing 
        duration-SignUpTransTime 
        ${extend ? "w-SignUpExtend" : "w-SignUpNormal"}
        `}>
          {!loggedIn ? <FaRegUser /> : <img src={user.image} alt="user" className='w-[30px] h-[30px] rounded-full' />}
      </button>      
    </div>
  )
}

export default connect(state => ({
  loggedIn: state.loggedIn,
  user: state.user
}), { setLoginModal })(LoginButton)