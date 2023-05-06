import { setDarkMode } from '../../redux/actions'
import { connect } from 'react-redux'
import { useState, useLayoutEffect } from 'react'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'
import Logo from './Logo'
import { dmButtonHover } from '../../config/styleConfig'

const HeroBar = (props) => {
  const { darkMode } = props
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
    <div className={`flex gap-2 md:gap-5 w-full h-[60px] items-center p-2 ${bgColor}`}>
      <div className='justify-self-start mx-2'>
        <Logo {...{
          darkMode
        }}/>
      </div>
      <div className='flex w-[90vw]'>
        {/* links here */}
      </div>
      <div className='flex mx-2 justify-self-end items-center'> 
        {/* Dark Mode Button Container */}
        <div className={dmToggleStyle}>
          <button onClick={handleColorModeToggle}>
            { darkMode ? <MdOutlineDarkMode /> : <MdDarkMode /> }
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode
}), { setDarkMode })(HeroBar)