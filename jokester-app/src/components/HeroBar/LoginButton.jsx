import { setLoginModal } from '../../redux/actions'
import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'

const LoginButton = (props) => {
  const { loggedIn } = props

  const [ buttonText, setButtonText ] = useState(loggedIn ? 'UserName' : 'Sign Up')

  function handleLogin() {
    if (!loggedIn) {
      props.setLoginModal(true)
    } 
  }

  useLayoutEffect(() => {
    if (loggedIn) {
      setButtonText('UserName')
    } else {
      setButtonText('Sign Up/Login')
    }
  }, [loggedIn])

  return (
    <div className='w-[13vw] h-auto my-[2px] px-2 text-white font-bold text-lg'>
      <button onClick={handleLogin} className='bg-blue-500 rounded-md w-full px-5 py-2 justify-center items-center'>
        <h2>{buttonText}</h2>
      </button>      
    </div>
  )
}

export default connect(state => ({
  loggedIn: state.loggedIn
}), { setLoginModal })(LoginButton)