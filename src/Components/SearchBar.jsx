import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ className, placeholder, onInputChange, type }) => {

    const [input, setInput] = useState('')

    const handleInput = (e) => {
        const value = e.target.value
        setInput(value)
        if (onInputChange) {
            onInputChange(value)
        }
    }

  return (
    <div className='relative'>
        <input type={type} placeholder={placeholder} value={input} onChange={handleInput} className={className} />
        <CiSearch width={18} alt='search-icon' className='absolute top-2 left-2 opacity-40' />
    </div>
  )
}

export default SearchBar