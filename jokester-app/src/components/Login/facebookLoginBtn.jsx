import { setLoggedIn, setLoginModal, setUser, setSessionId } from '../../redux/actions'
import React from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { FaFacebookF } from 'react-icons/fa'

import { client } from '../../client'

const FacebookLoginBtn = (props) => {
  const { dispatch } = props
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID
  
  async function uploadImageToDB(url) {
    const response = await fetch(url)
    const blob = await response.blob()
    const asset = await client.assets.upload('image', blob)
    return asset._id
  }

  const handleFacebookResponse = async (response) => {
    localStorage.setItem('user', JSON.stringify(response))
    const { id, name, picture } = response

    const imageAssetId = await uploadImageToDB(picture.data.url)

    const user = {
      _id: id,
      _type: 'user',
      userName: name,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      },
      imageUrl: picture.data.url,
    }

    client.createIfNotExists(user)
      .then(() => {
        dispatch(setUser(user))
        dispatch(setSessionId(user._id))
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