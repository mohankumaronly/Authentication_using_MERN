import React from 'react'

const CommonLayout = ({ children }) => {
    return (
        <div className='flex items-center justify-center h-screen flex-col'>
            {children}
        </div>
    )
}

export default CommonLayout