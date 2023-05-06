import { setDarkMode } from '../redux/actions'

import { connect } from 'react-redux'
import { useState } from 'react'

//Icons
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

const HeroBar = (props) => {
  const { darkMode } = props

  const [ bgColor, setBgColor ] = useState('darkModeSecondaryBg')
  const [ textColor, setTextColor ] = useState('darkModeSecondaryText')

  // Set up redux to handle this
  function handleColorModeToggle() {
    if (darkMode) {
      setBgColor('lightModeSecondaryBg')
      setTextColor('lightModeSecondaryText')
      props.setDarkMode(false)
    } else {
      setBgColor('darkModeSecondaryBg')
      setTextColor('darkModeSecondaryText')
      props.setDarkMode(true)
    }
  }

  return (
    <div className={`flex gap-2 md:gap-5 w-full h-[60px] p-2 ${bgColor}`}>
      <div className={`relative flex flex-col justify-center items-center text-[25px] ${textColor}`}>
        {/* Dark Mode Button Container */}
        <div className='flex mx-2 justify-center items-center'> 
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