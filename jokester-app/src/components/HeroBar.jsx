import { useState } from 'react'

//Icons
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

const HeroBar = () => {

  const [ bgColor, setBgColor ] = useState('darkModeSecondaryBg')
  const [ textColor, setTextColor ] = useState('darkModeSecondaryText')

  const isDarkMode = bgColor === 'darkModeSecondaryBg'

  function handleColorModeToggle() {
    if (isDarkMode) {
      setBgColor('lightModeSecondaryBg')
      setTextColor('lightModeSecondaryText')
    } else {
      setBgColor('darkModeSecondaryBg')
      setTextColor('darkModeSecondaryText')
    }
  }

  return (
    <div className={`flex gap-2 md:gap-5 w-full h-[60px] p-2 ${bgColor}`}>
      <div className={`relative flex flex-col justify-center items-center text-[25px] ${textColor}`}>
        <div className='absolute flex left-[97.5vw] justify-center items-center'> 
          <button onClick={handleColorModeToggle}>
            { isDarkMode ? <MdOutlineDarkMode /> : <MdDarkMode /> }
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBar