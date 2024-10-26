import React from 'react'
import { BeatLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(238, 238, 238, 0.2)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <BeatLoader color='#F6821F' />
    </div>
  )
}

export default Loader