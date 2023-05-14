import { setLoginModal, setUserDropDownMenu } from '../../redux/actions'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { client } from '../../client'
import { userQuery } from '../../utils/data'

import { FaRegUser } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'

const LoginButton = (props) => {
  const { darkMode, loggedIn, user, userDropDownMenu, dispatch } = props

  const [ extend, setExtend ] = useState(false)
  const [ buttonText, setButtonText ] = useState()
  const [ color, setColor ] = useState()
  const [ textColor, setTextColor ] = useState()
  const [ imageToLoad, setImageToLoad ] = useState()

  useEffect(() => {
    const userString = localStorage.getItem('user')

    if (userString && userString !== 'undefined') {
      if (userString.includes('google')) {
        const { sub, picture } = JSON.parse(userString)

        const query = userQuery(sub)
        client.fetch(query).then((userData) => {
          const user = { ...userData, _id: sub, imageUrl: picture }
          setImageToLoad(user.imageUrl)
        })
      } else {
        const { id } = JSON.parse(userString)

        const query = userQuery(id)
        client.fetch(query).then((userData) => {
          const user = { ...userData, _id: id }
          const { image } = user[0]
          setImageToLoad(image.asset.url)
        })
      }
    }
  }, [ loggedIn ])

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

    if (!userDropDownMenu) {
      signUpButton.addEventListener("mouseleave", handleLeave)
    } else if (!loggedIn) {
      signUpButton.addEventListener("mouseleave", handleLeave)
    }

    return () => {
        signUpButton.removeEventListener("mouseenter", handleHover)
        signUpButton.removeEventListener("mouseleave", handleLeave)
    }
  }, [ loggedIn, user, userDropDownMenu ])

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
    } else if (loggedIn && !userDropDownMenu) {
      dispatch(setUserDropDownMenu(true))
    } else if (loggedIn && userDropDownMenu) {
      dispatch(setUserDropDownMenu(false))
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
          <div className='flex items-center'>
            <h3 className={`flex justify-center items-center m-auto transition-opacity duration-200 ${extend ? "opacity-1" : "opacity-0"}`}>
              {buttonText}
            </h3>
            {loggedIn && <div className={`flex justify-center text-2xl items-center transition-opacity duration-200 ${extend ? "opacity-1" : "opacity-0"}`}>
              <MdKeyboardArrowDown className={`${userDropDownMenu ? "rotate-arrow-up" : "rotate-arrow-down"}`}/>
            </div>}
          </div>
          {!loggedIn ? <FaRegUser className='w-[35px] h-[35px] m-[10px]'/> :
          <img src={imageToLoad} alt="user" className='w-[40px] h-[40px] m-[7px] rounded-full' />}
      </button>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  loggedIn: state.loggedIn,
  user: state.user,
  userDropDownMenu: state.userDropDownMenu
}), { setLoginModal, setUserDropDownMenu })(LoginButton)

// ${extend ? "opacity-1" : "opacity-0"}