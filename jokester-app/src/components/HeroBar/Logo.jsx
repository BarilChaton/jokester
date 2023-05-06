import React, { useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { FaLaughSquint } from 'react-icons/fa'

const Logo = (props) => {

  const [ color, setColor ] = useState('darkModePrimaryText')

  useLayoutEffect(() => {
    if (props.darkMode) {
      setColor('darkModePrimaryText')
    } else {
      setColor('lightModePrimaryText')
    }
  }, [ props.darkMode ])

  return (
    <div className={`flex flex-col-2 items-center justify-center text-4xl ${color} font-bold logoFont`}>
      <h1>jokester</h1>
      <div className='rotate-m45'>
        <FaLaughSquint />
      </div>
    </div>
  )
}

export default connect(state => ({
  darkMode: state.darkMode
}))(Logo)