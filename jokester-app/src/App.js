import React from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Containers
import Home, { Reducer } from './containers/home'

const App = () => {

  const dispatch = useDispatch()

  const props = {
    Reducer,
    dispatch
  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Routes>
        <Route path='/*' element={<Home {...props} />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App;
