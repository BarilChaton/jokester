import { setLoginModal, setUserDropDownMenu } from '../../redux/actions'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { client } from '../../client'
import { userQuery } from '../../utils/data'

import { FaRegUser } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GiCrownCoin } from 'react-icons/gi'

const LoginButton = (props) => {
  const { darkMode, loggedIn, user, userDropDownMenu, dispatch } = props
  const coins = user && user[0].jokepoints

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
          const fetchedUser = { ...userData, _id: sub, imageUrl: picture }
          setImageToLoad(fetchedUser.imageUrl)
          const userName = fetchedUser[0].userName.split(" ")
          setButtonText(userName[0])
          extendButton()
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

    if (loggedIn) {
      setTimeout(() => {
        const { userName } = user
        const newUserName = userName.split(" ")

        setButtonText(newUserName[0])
        extendButton()
      }, 0)
    }

  }, [loggedIn, user])

  useLayoutEffect(() => {

    const handleHover = () => {
      if(!loggedIn) {
        extendButton().then(() => {
          setButtonText('Sign In')
        })
      }
    }

    const handleLeave = () => {
      if(!loggedIn) {
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
    <div className={`w-[300px] flex justify-end h-auto my-[2px] px-2 ${textColor} font-bold text-[17px]`}>
      <div className={`
        flex
        flex-row
        w-full
        h-[55px]
        items-center
        justify-end
        ${color}
        rounded-full
        sign-up-button
        p-0
        mx-1
        transition-width
        SignUpEasing
        duration-SignUpTransTime
        ${extend ? "w-SignUpExtend" : "w-SignUpNormal"}
        `}>
          <div className='flex w-full items-center'>
            <div className='flex justify-start w-full left-0 items-center mx-4 text-[28px]'>
              <GiCrownCoin />
              <h3 className='text-[18px] text-left mx-2'>{coins}</h3>
            </div>
            <button onClick={handleClick} className='flex w-[80%] justify-end items-center'>
              <h3 className={`flex justify-center items-center m-auto transition-opacity duration-200 ${extend ? "opacity-1" : "opacity-0"}`}>
              {buttonText}
              </h3>
              {loggedIn && <div className={`flex justify-center text-2xl items-center transition-opacity duration-200 ${extend ? "opacity-1" : "opacity-0"}`}>
                <MdKeyboardArrowDown className={`${userDropDownMenu ? "rotate-arrow-up" : "rotate-arrow-down"}`}/>
              </div>}
            </button>
            {!loggedIn ? <FaRegUser className='w-[35px] h-[35px] m-[10px]'/> :
              <img src={imageToLoad} alt="user" className='w-[40px] h-[40px] m-[7px] rounded-full' />}
          </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  loggedIn: state.loggedIn,
  user: state.user,
  userDropDownMenu: state.userDropDownMenu
}), { setLoginModal, setUserDropDownMenu })(LoginButton)