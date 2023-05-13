import React, { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { FaLaughSquint } from 'react-icons/fa'
import { logoHover } from '../../config/styleConfig'

const Logo = (props) => {
  const { darkMode, loginModalOpen } = props
  const { dm, lm, dmModal, lmModal } = logoHover
  
  const [ style, setStyle ] = useState()


  useLayoutEffect(() => {
    if (darkMode) {
      if (loginModalOpen) {
        setStyle(dmModal)
      } else {
        setStyle(dm)
      }
    } else {
      if (loginModalOpen) {
        setStyle(lmModal)
      } else {
        setStyle(lm)
      }
    }

    return () => {
      setStyle()
    }
  }, [darkMode, dm, dmModal, lm, lmModal, loginModalOpen])

  return (
    <div className={style}>
      <h1>jokester</h1>
      <div className='rotate-m45'>
        <FaLaughSquint />
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  loginModalOpen: state.loginModalOpen
}))(Logo)