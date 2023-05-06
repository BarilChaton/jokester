import { React, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Containers
import Home from './containers/Home'

const App = () => {

  return (
    <GoogleOAuthProvider>
      <Routes>
        <Route path='/*' element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App;
