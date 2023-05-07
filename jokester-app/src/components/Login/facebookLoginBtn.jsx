import { setLoggedIn, setLoginModal, setUser, setSessionId } from '../../redux/actions'
import React from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { FaFacebookF } from 'react-icons/fa'

import { client } from '../../client'

const FacebookLoginBtn = (props) => {
  const { dispatch } = props
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID
  
  const handleFacebookResponse = (response) => {
    localStorage.setItem('user', JSON.stringify(response))
    const { id, name, picture } = response
    const { data } = picture
    const { url } = data

    const facebookUser = {
      _id: id,
      _type: 'user',
      userName: name,
      image: url
    }

    client.createIfNotExists(facebookUser)
      .then(() => {
        dispatch(setUser(facebookUser))
        dispatch(setSessionId(facebookUser._id))
        dispatch(setLoggedIn(true))
        dispatch(setLoginModal(false))
      })
  }

  return (
    <FacebookLogin
      appId={facebookAppId}
      fields="name,email,picture"
      callback={handleFacebookResponse}
      render={renderProps => (
        <button 
          class='flex flex-col-2 rounded-lg' 
          onClick={renderProps.onClick}>
          <FaFacebookF />
          Login with Facebook
        </button>
      )}
    />
  )
}

export default connect(state => ({

}), { setLoggedIn, setLoginModal, setUser, setSessionId })(FacebookLoginBtn)