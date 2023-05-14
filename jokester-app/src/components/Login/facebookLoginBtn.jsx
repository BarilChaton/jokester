import { setLoggedIn, setLoginModal, setUser, setSessionId, setDarkMode } from '../../redux/actions'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { client } from '../../client'
import { userQuery } from '../../utils/data'
import { FaFacebookF } from 'react-icons/fa'

const FacebookLoginBtn = (props) => {
  const { darkMode, dispatch } = props
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

  const [ userExists, setUserExists ] = useState(false)

  async function uploadImageToDB(url) {
    const response = await fetch(url)
    const blob = await response.blob()
    const asset = await client.assets.upload('image', blob)
    return asset._id
  }

  const handleFacebookResponse = async (response) => {
    localStorage.setItem('user', JSON.stringify(response))
    const { id, name, picture, email } = response

    const query = userQuery(id)

    client.fetch(query).then((userData) => {
      setUserExists(true)
      dispatch(setUser(userData[0]))
      dispatch(setSessionId(id))
      dispatch(setLoggedIn(true))
      dispatch(setDarkMode(userData[0].settings.darkmode))
      console.warn("User found in database")
      dispatch(setLoginModal(false))
    }).then(() => {
      if (userExists) {
        console.warn("User was not found in database, creating new user")
        const imageAssetId = uploadImageToDB(picture.data.url)

        const user = {
          _id: id,
          _type: 'user',
          userName: name,
          jokestername: "",
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAssetId
            }
          },
          imageUrl: picture.data.url,
          email: email,
          jokepoints: 0,
          jokescore: 0,
          settings: {
            darkmode: darkMode,
            showrealname: false,
            showemail: false
          }
        }

        // Add a way to await a promise
        client.createIfNotExists(user)
          .then(() => {
            client.fetch(query).then((userData) => {
            dispatch(setUser(userData[0]))
            dispatch(setSessionId(id))
            dispatch(setLoggedIn(true))
            dispatch(setDarkMode(userData[0].settings.darkmode))
            console.warn("User created and found in database")
            dispatch(setLoginModal(false))
          })
        })
      }
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
  darkMode: state.darkMode
}), { setLoggedIn, setLoginModal, setUser, setSessionId, setDarkMode })(FacebookLoginBtn)