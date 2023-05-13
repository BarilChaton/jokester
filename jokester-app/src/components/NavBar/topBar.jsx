import { setDarkMode } from '../../redux/actions'
import { connect } from 'react-redux'
import { useState, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'
import Logo from './logo'
import { dmButtonHover } from '../../config/styleConfig'
import LoginButton from './loginButton'

const TopBar = (props) => {
  const { darkMode, dispatch } = props
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
      dispatch(setDarkMode(false))
    } else {
      dispatch(setDarkMode(true))
    }
  }

  return (
    <div className={`flex relative w-full h-full shadow-lg items-center p-2 ${bgColor}`}>
      <div className='flex absolute left-0 ml-[75px] items-center'>
        <NavLink to={'/'}>
          <Logo {...{
            darkMode
          }}/>
        </NavLink>
      </div>
      <div className='flex absolute right-0 flex-col-2 justify-end items-center z-[11]'>
        <div className='items-center'>
          {/* login or options dropdown button */}
          <LoginButton {...props}/>
        </div>
        <div className='justify-center mr-[75px] items-center z-[12]'> 
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
}), { setDarkMode })(TopBar)