import { setLoggedIn, setLoginModal, setUser, setSessionId } from '../../redux/actions'
import React from 'react'
import { connect } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { client } from '../../client'


const GoogleLoginBtn = (props) => {
  const { dispatch } = props

  async function uploadImageToDB(url) {
    const response = await fetch(url)
    const blob = await response.blob()
    const asset = await client.assets.upload('image', blob)
    return asset._id
  }

  const googleResponse = async (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))
    const { name, picture, sub: id } = decoded

    const imageAssetId = await uploadImageToDB(picture)

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
      imageUrl: picture,
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
    <div>
      <GoogleLogin 
        clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
        onSuccess={(response) => googleResponse(response)}
        onError={() => console.log('error')}
      />
    </div>
  )
}

export default connect(state => ({

}), { setLoggedIn, setLoginModal, setUser, setSessionId })(GoogleLoginBtn)