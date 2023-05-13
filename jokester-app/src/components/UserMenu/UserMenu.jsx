import { setUser, setLoggedIn, setUserDropDownMenu, setSessionId } from '../../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

const UserMenu = (props) => {
  const { darkMode } = props

  const [ bgColor, setBgColor ] = useState()
  const [ textColor, setTextColor ] = useState()
  const [ hoverColor, setHoverColor ] = useState()

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

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className={`flex w-[350px] h-[500px] shadow-lg rounded-b-xl ${bgColor} ${textColor}`}>
      <div className='flex w-full h-full justify-center'>
        <div className='flex flex-col w-full text-center font-bold text-2xl items-center divide-y'>
          <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>Profile</h3>
          <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>My Posts</h3>
          <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>Point Shop</h3>
          <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>My Inventory</h3>
          <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>My Comments</h3>
          <h3 className={`w-full py-[19.3px] hover:bg-${hoverColor} duration-150 cursor-pointer`}>Settings</h3>
          <h3 className={`w-full py-[19.3px] rounded-b-xl hover:bg-${hoverColor} duration-150 cursor-pointer`} onClick={logout}>Logout</h3>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  user: state.user,
  userDropDownMenu: state.userDropDownMenu
}), { setLoggedIn, setUserDropDownMenu, setSessionId, setUser })(UserMenu)