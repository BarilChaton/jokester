import { setLoggedIn, setLoginModal, setUser, setSessionId, setDarkMode } from '../../redux/actions'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { client } from '../../client'
import { userQuery } from '../../utils/data'


const GoogleLoginBtn = (props) => {
  const { darkMode, dispatch } = props

  const [ userExists, setUserExists ] = useState(false)

  async function uploadImageToDB(url) {
    const response = await fetch(url)
    const blob = await response.blob()
    const asset = await client.assets.upload('image', blob)
    return asset._id
  }

  const googleResponse = async (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))
    const { name, picture, sub, email } = decoded

    const query = userQuery(sub)

    client.fetch(query).then((userData) => {
      setUserExists(true)
      dispatch(setUser(userData[0]))
      dispatch(setSessionId(sub))
      dispatch(setLoggedIn(true))
      dispatch(setDarkMode(userData[0].settings.darkmode))
      console.warn("User found in database")
      dispatch(setLoginModal(false))
    }).then(() => {
      if (!userExists) {
        console.warn("User was not found in database, creating new user")
        const imageAssetId = uploadImageToDB(picture)

        const user = {
          _id: sub,
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
          imageUrl: picture,
          email: email,
          jokepoints: 0,
          jokescore: 0,
          settings: {
            darkmode: darkMode,
            showrealname: false,
            showemail: false
          }
        }

        const createdUserPromise = new Promise((resolve) => {
          client.createIfNotExists(user).then(() => {
            resolve()
          })
        })

        // Add a way to await a promise
        createdUserPromise.then(() => {
          client.fetch(query).then((userData) => {
          dispatch(setUser(userData[0]));
          dispatch(setSessionId(sub));
          dispatch(setLoggedIn(true));
          dispatch(setDarkMode(userData[0].settings.darkmode));
          console.warn("User created and found in database");
          dispatch(setLoginModal(false));
          })
        })
      }
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
  darkMode: state.darkMode
}), { setLoggedIn, setLoginModal, setUser, setSessionId, setDarkMode })(GoogleLoginBtn)