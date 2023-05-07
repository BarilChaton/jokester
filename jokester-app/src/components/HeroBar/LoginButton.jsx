import { setLoginModal } from '../../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

import { FaRegUser } from 'react-icons/fa'

const LoginButton = (props) => {
  const { loggedIn, user } = props

  const [ extend, setExtend ] = useState(false)
  const [ buttonText, setButtonText ] = useState()



  useLayoutEffect(() => {
    if (loggedIn) {
      setButtonText('UserName')
    } else {
      setButtonText('Sign Up/Login')
    }
  }, [ loggedIn ])

  useLayoutEffect(() => {

  }, [])

  function handleClick() {
    if (!loggedIn) {
      props.setLoginModal(true)
    } 
  }

  return (
    <div className='w-[15vw] flex justify-end h-auto my-[2px] px-2 text-white font-bold text-lg'>
      <button onClick={handleClick} className='flex flex-row h-[40px] w-[40px] items-center justify-center bg-blue-400 text-white rounded-full p-0 m-3'>
        {!loggedIn ? <FaRegUser /> : <img src={user.image} alt="user" className='w-[30px] h-[30px] rounded-full' />}
      </button>      
    </div>
  )
}

export default connect(state => ({
  loggedIn: state.loggedIn,
  user: state.user
}), { setLoginModal })(LoginButton)