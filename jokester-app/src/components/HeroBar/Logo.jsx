import React, { useState, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaLaughSquint } from 'react-icons/fa'
import { logoHover } from '../../config/styleConfig'

const Logo = (props) => {
  const { darkMode } = props
  const { dm, lm } = logoHover
  
  const [ style, setStyle ] = useState()


  useLayoutEffect(() => {
    if (darkMode) {
      setStyle(dm)
    } else {
      setStyle(lm)
    }

    return () => {
      setStyle()
    }
  }, [darkMode, dm, lm])

  return (
    <NavLink to={'/'}>
      <div className={style}>
        <h1>jokester</h1>
        <div className='rotate-m45'>
          <FaLaughSquint />
        </div>
      </div>
    </NavLink>
  )
}

export default connect(state => ({
  darkMode: state.darkMode
}))(Logo)