import React from 'react'

const Button = ({ text, type, onClick, fullWidth = false }) => {
  return (
    <button className={`px-20 py-2 border-2 bg-gray-300 font-semibold cursor-pointer rounded-sm ${fullWidth ? "w-full" : "w-fit"}`}
      type={type}
      onClick={onClick}
    >{text}</button>
  )
}

export default Button