import { setUser, setLoggedIn, setUserDropDownMenu, setSessionId, setProfileWindow } from '../../redux/actions'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { client } from '../../client'
import { userQuery } from '../../utils/data'
import { connect } from 'react-redux'

import { FaRegImage, FaShoppingBag, FaRegComments } from 'react-icons/fa'
import { TbBackpack, TbSettings } from 'react-icons/tb'
import { MdOutlinePowerSettingsNew } from 'react-icons/md'

const UserMenu = (props) => {
  const { darkMode, loggedIn, dispatch } = props

  const [ bgColor, setBgColor ] = useState()
  const [ textColor, setTextColor ] = useState()
  const [ hoverColor, setHoverColor ] = useState()
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
    if (darkMode) {
      setBgColor('darkModeSecondaryBg')
      setTextColor('darkModePrimaryText')
      setHoverColor('[#807474]')
    } else {
      setBgColor('lightModeSecondaryBg')
      setTextColor('lightModePrimaryText')
      setHoverColor('[#ebe0e0]')
    }

    return () => {
      setBgColor()
    }
  }, [ darkMode ])

  const openProfile = () => {
    dispatch(setProfileWindow(true))
    dispatch(setUserDropDownMenu(false))
  }

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className={`flex w-[350px] h-[500px] shadow-lg rounded-b-xl ${bgColor} ${textColor}`}>
      <div className='flex w-full h-full justify-center'>
        <div className='flex flex-col w-full text-center font-bold text-2xl items-center divide-y'>
          <div className={`flex flex-col-2 relative justify-center items-center w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <img src={imageToLoad} alt="user" className='w-[40px] h-[40px] absolute left-0 mx-5 rounded-full' />
            <h3 className={`w-full hover:bg-${hoverColor} duration-150 cursor-pointer`} onClick={openProfile}>Profile</h3>
          </div>
          <div className={`flex flex-col-2 relative justify-center items-center w-full hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <FaRegImage className='max-w-[40px] max-h-[40px] absolute left-0 ml-7'/>
            <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>My Posts</h3>
          </div>
          <div className={`flex flex-col-2 relative justify-center items-center w-full hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <FaShoppingBag className='max-w-[40px] max-h-[40px] absolute left-0 ml-7'/>
            <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>Point Shop</h3>
          </div>
          <div className={`flex flex-col-2 relative justify-center items-center w-full hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <TbBackpack className='max-w-[40px] max-h-[40px] absolute left-0 ml-7'/>
            <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>My Inventory</h3>
          </div>
          <div className={`flex flex-col-2 relative justify-center items-center w-full hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <FaRegComments className='max-w-[40px] max-h-[40px] absolute left-0 ml-7'/>
            <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>My Discussions</h3>
          </div>
          <div className={`flex flex-col-2 relative justify-center items-center w-full hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <TbSettings className='max-w-[40px] max-h-[40px] absolute left-0 ml-7'/>
            <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>Settings</h3>
          </div>
          <div className={`flex flex-col-2 relative rounded-b-xl justify-center items-center w-full hover:bg-${hoverColor} duration-150 cursor-pointer`}>
            <MdOutlinePowerSettingsNew className='max-w-[40px] max-h-[40px] absolute left-0 ml-7'/>
            <h3 className={`w-full py-[19.3px] rounded-b-xl hover:bg-${hoverColor} duration-150 cursor-pointer`} onClick={logout}>Logout</h3>
          </div>
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
}), { setLoggedIn, setUserDropDownMenu, setSessionId, setUser,
  setProfileWindow })(UserMenu)