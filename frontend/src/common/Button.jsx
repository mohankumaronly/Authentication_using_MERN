import React from 'react'

const Button = ({ text, type }) => {
  return (
    <button className='px-20 py-2 border-2 bg-gray-300 font-semibold cursor-pointer rounded-sm'
      type={type}
    >{text}</button>
  )
}

export default Button