import { setDarkMode } from '../../redux/actions'
import { connect } from 'react-redux'
import { useState, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'
import Logo from './Logo'
import { dmButtonHover } from '../../config/styleConfig'
import LoginButton from './LoginButton'

const HeroBar = (props) => {
  const { darkMode, loggedIn } = props
  const { dm, lm } = dmButtonHover

  const [ bgColor, setBgColor ] = useState()
  const [ dmToggleStyle, setDmToggleStyle ] = useState(darkMode ? dm : lm)

  useLayoutEffect(() => {
    if (darkMode) {
      setBgColor('darkModeSecondaryBg')
      setDmToggleStyle(dm)
    } else {
      setBgColor('lightModeSecondaryBg')
      setDmToggleStyle(lm)
    }

    return () => {
      setBgColor()
      setDmToggleStyle()
    }
  }, [darkMode, dm, lm])

  function handleColorModeToggle() {
    if (darkMode) {
      props.setDarkMode(false)
    } else {
      props.setDarkMode(true)
    }
  }

  return (
    <div className={`flex relative w-full h-full items-center p-2 ${bgColor}`}>
      <div className='flex absolute left-0 ml-[75px] items-center'>
        <NavLink to={'/'}>
          <Logo {...{
            darkMode
          }}/>
        </NavLink>
      </div>
      <div className='flex absolute right-0 flex-col-2 justify-end items-center'>
        <div className='items-center'>
          {/* login or options dropdown button */}
          <LoginButton {...{
            loggedIn
          }}/>
        </div>
        <div className='justify-center mr-[75px] items-center'> 
          {/* Dark Mode Button Container */}
          <div className={dmToggleStyle}>
            <button onClick={handleColorModeToggle}>
              { darkMode ? <MdOutlineDarkMode /> : <MdDarkMode /> }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode,
  loggedIn: state.loggedIn
}), { setDarkMode })(HeroBar)