import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

const UserMenu = (props) => {
  const { darkMode, userDropDownMenu, dispatch } = props

  const [ bgColor, setBgColor ] = useState()

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModeSecondaryBg')
    } else {
      setBgColor('lightModeSecondaryBg')
    }

    return () => {
      setBgColor()
    }
  }, [ darkMode ])

  return (
    <div className={`flex w-[350px] h-[500px] shadow-lg ${bgColor}`}>
      
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  user: state.user,
  userDropDownMenu: state.userDropDownMenu
}))(UserMenu)