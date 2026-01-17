import React from 'react'
import Button from './Button'

const InputText = ({ type, placeholder, name, value, onChange, label, buttonType, buttonText }) => {
    return (
        <div className='flex flex-col bg-gray-100 p-5 w-96 shadow-2xl'>
            <label className='font-bold text-3xl'>{label}</label>
            <input
                className='border px-5 py-2 rounded-sm'
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            < Button text={buttonText} type={buttonType} />
        </div>
    )
}

export default InputText