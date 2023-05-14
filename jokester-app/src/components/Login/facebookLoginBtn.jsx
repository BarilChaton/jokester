import { setLoggedIn, setLoginModal, setUser, setSessionId, setDarkMode } from '../../redux/actions'
import React from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { client } from '../../client'
import { userQuery } from '../../utils/data'
import { FaFacebookF } from 'react-icons/fa'

const FacebookLoginBtn = (props) => {
  const { darkMode, dispatch } = props
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

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
    const imageAssetId = await uploadImageToDB(picture.data.url)

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

    client.createIfNotExists(user).then(() => {
      client.fetch(query).then((userData) => {
        const UserData = { ...userData, _id: id }
        console.log(UserData);

        dispatch(setUser(UserData))
        dispatch(setSessionId(id))
        dispatch(setLoggedIn(true))
        dispatch(setDarkMode(UserData[0].settings.darkmode))
        dispatch(setLoginModal(false))
      })
    })
  }

  return (
    <div className='w-[310.5px] h-[57px] flex flex-col-2 relative justify-center items-center bg-[#4c69ba] rounded-md overflow-hidden'>
      <div className='flex w-1/7 items-center ml-3 text-white text-3xl'>
        <FaFacebookF />
      </div>
      <div className='flex w-6/7 items-center'>
        <FacebookLogin
          appId={facebookAppId}
          fields="name,email,picture"
          callback={handleFacebookResponse}
          render={renderProps => (
          <button
            class='flex flex-col-2 rounded-lg'
            onClick={renderProps.onClick}>
            Login with Facebook
          </button>
        )}
      />
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode
}), { setLoggedIn, setLoginModal, setUser, setSessionId, setDarkMode })(FacebookLoginBtn)