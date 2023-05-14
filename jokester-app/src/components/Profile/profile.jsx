import { setProfileWindow } from '../../redux/actions'
import React, { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Profile = (props) => {
  const { darkMode, user, dispatch } = props

  const [ bgColor, setBgColor ] = useState()
  const [ textColor, setTextColor ] = useState()

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModeTertiaryBg')
      setTextColor('darkModePrimaryText')
    } else {
      setBgColor('lightModeTertiaryBg')
      setTextColor('lightModePrimaryText')
    }
  }, [ darkMode ])

  const closeWindow = () => {
    dispatch(setProfileWindow(false))
  }

  return (
    <div className={`flex w-[90vw] h-[85vh] ${bgColor} justify-center p-5 rounded-xl shadow-lg`}>
      <div className={`flex w-full h-[50px] ${textColor} justify-end top-0 text-2xl`}>
        <AiOutlineCloseCircle className='cursor-pointer' onClick={closeWindow}/>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  user: state.user
}), { setProfileWindow })(Profile)