import React from 'react'

const TextInput = ({ placeholder, value, setValue }) => {

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
      type="text"
      autoFocus
      placeholder={placeholder}
      onChange={handleChange}
      value={value} />
  )
}

export default TextInput
