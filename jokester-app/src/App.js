import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Containers
import Home, { Reducer } from './containers/Home'

const App = () => {

  const props = {
    Reducer
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
