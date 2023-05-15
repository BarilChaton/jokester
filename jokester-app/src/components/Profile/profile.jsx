import { setProfileWindow } from '../../redux/actions'
import React, { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { client } from '../../client'
import { userQuery } from '../../utils/data'

import { AiOutlineCloseCircle } from 'react-icons/ai'

const Profile = (props) => {
  const { darkMode, user, dispatch } = props
  const { _id } = user

  const [ bgColor, setBgColor ] = useState()
  const [ textColor, setTextColor ] = useState()
  const [ imageToLoad, setImageToLoad ] = useState()

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModeTertiaryBg')
      setTextColor('darkModePrimaryText')
    } else {
      setBgColor('lightModeTertiaryBg')
      setTextColor('lightModePrimaryText')
    }
  }, [ darkMode ])

  useLayoutEffect(() => {
    const query = userQuery(_id)
    client.fetch(query).then((userData) => {
      console.log(userData);
      setImageToLoad(userData[0].image.asset.url)
    })
  }, [ _id ])

  const closeWindow = () => {
    dispatch(setProfileWindow(false))
  }

  return (
    <div className={`flex w-[90vw] h-[85vh] ${bgColor} justify-center p-5 rounded-xl shadow-lg`}>
      <div className='flex justify-center items-center w-full h-[150px]'>
        <div className='flex relative justify-center w-full h-full'>
          <div className='flex w-[150px] h-full justify-center items-center'>
            <img className='w-full h-full rounded-full shadow-2xl' src={imageToLoad} alt="userImage" />
          </div>
          <div className={`absolute right-0 ${textColor} top-0 text-2xl`}>
            <AiOutlineCloseCircle className='cursor-pointer' onClick={closeWindow}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  user: state.user
}), { setProfileWindow })(Profile)